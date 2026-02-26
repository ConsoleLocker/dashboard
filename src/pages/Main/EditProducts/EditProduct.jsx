/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import { Upload, Input, Button, Form, Typography, Select } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import {
  useProductQuestionEditMutation,
  useSellProductSingleQuery,
} from "../../../redux/features/productQuestionSlice";
import toast from "react-hot-toast";

export default function EditProduct() {
  const { id } = useParams();
  const [fileList, setFileList] = useState([]);
  const [form] = Form.useForm();
  const [productQuestionEdit] = useProductQuestionEditMutation();
  const { data } = useSellProductSingleQuery(id);
  const product = data?.data;
  const navigate = useNavigate();

  // questions state to track current questions + options
  const [questions, setQuestions] = useState([]);

  const IMAGE = import.meta.env.VITE_IMAGE_API;

  // Load product data and populate form + questions state once product loads
  useEffect(() => {
    if (product) {
      // Map questions/options from product for internal state
      const loadedQuestions =
        product.questions?.map((q) => ({
          name: q.name,
          description: q.description,
          options:
            q.options?.map((opt) => ({
              option: opt.option,
              price: opt.price,
              description: opt.description,
            })) || [],
        })) || [];

      setQuestions(loadedQuestions);

      // Prepare initial values for form:
      // We'll flatten questions and options into form fields
      const initialFormValues = {
        name: product.name || "",
        base_price: product.base_price || 0,
        product_type: product.product_type || "",
      };

      loadedQuestions.forEach((q, qIndex) => {
        initialFormValues[`questionName${qIndex}`] = q.name;
        initialFormValues[`questionDescription${qIndex}`] = q.description;
        q.options.forEach((opt, oIndex) => {
          initialFormValues[`option${qIndex}_${oIndex}`] = opt.option;
          initialFormValues[`price${qIndex}_${oIndex}`] = opt.price;
          initialFormValues[`description${qIndex}_${oIndex}`] = opt.description;
        });
      });

      form.setFieldsValue(initialFormValues);

      if (product.image) {
        setFileList([
          {
            url: `${IMAGE}${product.image}`,
            uid: "-1",
            name: "existing-image",
          },
        ]);
      }
    }
  }, [product, form, IMAGE]);

  // Handle file upload (only one allowed)
  const handleUpload = ({ fileList }) => {
    setFileList(fileList.slice(-1));
  };

  // Add a new empty question with one empty option
  const handleAddQuestion = () => {
    setQuestions((prev) => [
      ...prev,
      {
        name: "",
        description: "",
        options: [{ option: "", price: 0, description: "" }],
      },
    ]);
  };

  // Delete a question and clean up form fields accordingly
  const handleDeleteQuestion = (qIndex) => {
    const updated = [...questions];
    updated.splice(qIndex, 1);
    setQuestions(updated);

    // Clean form fields for questions shifted after deleted one
    const values = form.getFieldsValue(true);
    const newValues = {};

    Object.keys(values).forEach((key) => {
      // Remove deleted question's fields
      if (
        key.startsWith(`questionName${qIndex}`) ||
        key.startsWith(`questionDescription${qIndex}`)
      ) {
        return; // skip
      }

      // For options and question fields with higher indices, shift keys down by 1
      const questionNameMatch = key.match(/^questionName(\d+)$/);
      const questionDescMatch = key.match(/^questionDescription(\d+)$/);
      const optionMatch = key.match(/^(option|price|description)(\d+)_(\d+)$/);

      if (questionNameMatch) {
        const idx = parseInt(questionNameMatch[1], 10);
        newValues[`questionName${idx > qIndex ? idx - 1 : idx}`] = values[key];
      } else if (questionDescMatch) {
        const idx = parseInt(questionDescMatch[1], 10);
        newValues[`questionDescription${idx > qIndex ? idx - 1 : idx}`] =
          values[key];
      } else if (optionMatch) {
        const [_, type, qI, oI] = optionMatch;
        const questionIndex = parseInt(qI, 10);
        const optionIndex = parseInt(oI, 10);

        if (questionIndex === qIndex) {
          // skip all options of deleted question
          return;
        }

        const newQuestionIndex =
          questionIndex > qIndex ? questionIndex - 1 : questionIndex;
        newValues[`${type}${newQuestionIndex}_${optionIndex}`] = values[key];
      } else {
        newValues[key] = values[key];
      }
    });

    form.setFieldsValue(newValues);
  };

  // Add an option to a question
  const handleAddOption = (qIndex) => {
    const updated = [...questions];
    updated[qIndex].options.push({ option: "", price: 0, description: "" });
    setQuestions(updated);
  };

  // Delete an option from a question and clean up form fields
  const handleDeleteOption = (qIndex, oIndex) => {
    const updatedQuestions = [...questions];
    updatedQuestions[qIndex].options.splice(oIndex, 1);
    setQuestions(updatedQuestions);

    const allValues = form.getFieldsValue(true);
    const newValues = {};

    Object.keys(allValues).forEach((key) => {
      if (
        key === `option${qIndex}_${oIndex}` ||
        key === `price${qIndex}_${oIndex}` ||
        key === `description${qIndex}_${oIndex}`
      ) {
        // skip deleted option fields
        return;
      }
      // Shift option indices down if after deleted option
      const optionMatch = key.match(/^(option|price|description)(\d+)_(\d+)$/);
      if (optionMatch) {
        const [_, type, qI, oI] = optionMatch;
        const questionIndex = parseInt(qI, 10);
        const optionIndex = parseInt(oI, 10);
        if (questionIndex === qIndex && optionIndex > oIndex) {
          newValues[`${type}${qIndex}_${optionIndex - 1}`] = allValues[key];
        } else {
          newValues[key] = allValues[key];
        }
      } else {
        newValues[key] = allValues[key];
      }
    });

    form.setFieldsValue(newValues);
  };

  const onFinish = async (values) => {
    const toastId = toast.loading("Updating product...");
    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("base_price", values.base_price);
    formData.append("product_type", values.product_type);

    const questionsArray = questions.map((question, qIndex) => ({
      name: values[`questionName${qIndex}`],
      description: values[`questionDescription${qIndex}`],
      options: question.options.map((_, oIndex) => ({
        option: values[`option${qIndex}_${oIndex}`],
        price: parseFloat(values[`price${qIndex}_${oIndex}`]),
        description: values[`description${qIndex}_${oIndex}`],
      })),
    }));

    formData.append("questions", JSON.stringify(questionsArray));

    if (fileList.length > 0 && fileList[0].originFileObj) {
      formData.append("images", fileList[0].originFileObj);
    }

    try {
      await productQuestionEdit({ id, formData }).unwrap();
      navigate("/productQuestion");
      form.resetFields();
      setFileList([]);
      toast.success("Product updated successfully", { id: toastId });
    } catch (error) {
      toast.error("Failed to update product", { id: toastId });
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg">
      <div className="flex justify-between items-center mb-4 container mx-auto">
        <div className="flex items-center gap-2">
          <Link to={"/productQuestion"}>
            <Button
              type="link"
              icon={<ArrowLeft />}
              className="text-black text-lg"
            />
          </Link>
          <h2 className="text-3xl font-semibold">Edit Product Question</h2>
        </div>
      </div>

      <Form form={form} layout="vertical" onFinish={onFinish}>
        <div className="flex gap-4">
          <Upload
            listType="picture-card"
            fileList={fileList}
            onChange={handleUpload}
            beforeUpload={() => false}
            maxCount={1}>
            {fileList.length === 0 && (
              <div className="text-center">
                <UploadOutlined className="text-2xl mb-2" />
                <Typography.Text>Upload Image</Typography.Text>
              </div>
            )}
          </Upload>

          <div className="flex-1 space-y-4">
            <Form.Item
              label="Product Name"
              name="name"
              rules={[
                { required: true, message: "Please enter a product name" },
              ]}>
              <Input className="py-3" placeholder="Enter a name" />
            </Form.Item>

            <Form.Item
              label="Estimate Price"
              name="base_price"
              rules={[
                { required: true, message: "Please enter an estimate price" },
              ]}>
              <Input className="py-3" placeholder="Enter an estimate price" />
            </Form.Item>

            <Form.Item
              label="Product Type"
              name="product_type"
              rules={[
                { required: true, message: "Please select a product type" },
              ]}>
              <Select placeholder="Select a product type">
                <Select.Option value="xbox">Xbox</Select.Option>
                <Select.Option value="nintendo">Nintendo</Select.Option>
                <Select.Option value="playstation">Playstation</Select.Option>
              </Select>
            </Form.Item>

            {questions.map((question, qIndex) => (
              <div key={qIndex} className="space-y-4 border p-4 rounded-md">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold">
                    Question {qIndex + 1}
                  </h3>
                  <Button danger onClick={() => handleDeleteQuestion(qIndex)}>
                    Delete Question
                  </Button>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <Form.Item
                    label="Question Name"
                    name={`questionName${qIndex}`}
                    rules={[
                      {
                        required: true,
                        message: "Please enter a question name",
                      },
                    ]}>
                    <Input placeholder="Enter question name" />
                  </Form.Item>

                  <Form.Item
                    label="Question Description"
                    name={`questionDescription${qIndex}`}
                    rules={[
                      {
                        required: true,
                        message: "Please enter a question description",
                      },
                    ]}>
                    <Input placeholder="Enter question description" />
                  </Form.Item>
                </div>

                <h4 className="text-md font-semibold">Options</h4>
                {question.options.map((option, oIndex) => (
                  <div
                    key={`${qIndex}-${oIndex}`}
                    className="grid grid-cols-3 gap-4 items-end">
                    <Form.Item
                      key={`option${qIndex}_${oIndex}`}
                      label={`Option ${oIndex + 1}`}
                      name={`option${qIndex}_${oIndex}`}
                      rules={[
                        { required: true, message: "Please enter an option" },
                      ]}>
                      <Input placeholder="Enter option" />
                    </Form.Item>

                    <Form.Item
                      key={`price${qIndex}_${oIndex}`}
                      label={`Price ${oIndex + 1}`}
                      name={`price${qIndex}_${oIndex}`}
                      rules={[
                        { required: true, message: "Please enter a price" },
                      ]}>
                      <Input type="number" placeholder="Enter price" />
                    </Form.Item>

                    <Form.Item
                      key={`description${qIndex}_${oIndex}`}
                      label={`Description ${oIndex + 1}`}
                      name={`description${qIndex}_${oIndex}`}
                      rules={[
                        {
                          required: false,
                          message: "Please enter a description",
                        },
                      ]}>
                      <Input placeholder="Enter description" />
                    </Form.Item>

                    <Button
                      danger
                      className="col-span-3 w-fit"
                      onClick={() => handleDeleteOption(qIndex, oIndex)}>
                      Delete Option
                    </Button>
                  </div>
                ))}

                <Button
                  type="dashed"
                  onClick={() => handleAddOption(qIndex)}
                  className="mt-2">
                  Add Option
                </Button>
              </div>
            ))}

            <Button
              type="dashed"
              onClick={handleAddQuestion}
              className="w-full mt-6">
              Add Question
            </Button>

            <div className="flex justify-end mt-6">
              <Button
                type="primary"
                htmlType="submit"
                className="bg-[#101010] px-10 py-5">
                Update Product
              </Button>
            </div>
          </div>
        </div>
      </Form>
    </div>
  );
}
