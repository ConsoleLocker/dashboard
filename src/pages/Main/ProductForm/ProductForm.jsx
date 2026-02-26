import { useState } from "react";
import { Upload, Input, Button, Form, message, Select } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useProductQuestionPostMutation } from "../../../redux/features/productQuestionSlice";

export default function ProductForm() {
  const [fileList, setFileList] = useState([]);
  const [form] = Form.useForm();
  const [productQuestionPost, refetch] = useProductQuestionPostMutation();
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([
    {
      name: "",
      description: "",
      options: [
        { option: "", price: "", description: "" },
        { option: "", price: "", description: "" },
      ],
    },
  ]); // Initialize with one question and two options

  const handleUpload = ({ fileList }) => setFileList(fileList);

  const onFinish = async (values) => {
    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("base_price", values.base_price);
    formData.append("product_type", values.product_type);
    formData.append("brand", values.brand);

    // Build the questions array dynamically
    const questionsArray = questions.map((question, qIndex) => ({
      name: values[`questionName${qIndex}`],
      description: values[`questionDescription${qIndex}`],
      options: question.options.map((option, oIndex) => ({
        option: values[`option${qIndex}_${oIndex}`],
        price: parseFloat(values[`price${qIndex}_${oIndex}`]),
        description: values[`description${qIndex}_${oIndex}`] || "", // Ensure description is not undefined
      })),
    }));

    formData.append("questions", JSON.stringify(questionsArray));

    if (fileList.length > 0) {
      formData.append("images", fileList[0].originFileObj);
    }

    try {
      const response = await productQuestionPost(formData).unwrap();
      navigate("/productQuestion");
      console.log(response);
      refetch();
      message.success(response.message);
      form.resetFields();
      setFileList([]);
    } catch (error) {
      console.error("Failed to create product question:", error);
      // message.error("Failed to create product question");
    }
  };

  const addQuestion = () => {
    setQuestions([
      ...questions,
      {
        name: "",
        description: "",
        options: [
          { option: "", price: "", description: "" },
          { option: "", price: "", description: "" },
        ],
      },
    ]);
  };

  const addOption = (qIndex) => {
    const updatedQuestions = [...questions];
    updatedQuestions[qIndex].options.push({
      option: "",
      price: "",
      description: "",
    });
    setQuestions(updatedQuestions);
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
          <h2 className="text-3xl font-semibold">
            Estimate your Product Price
          </h2>
        </div>
      </div>

      <Form form={form} layout="vertical" onFinish={onFinish}>
        <div className="flex gap-4">
          <Upload
            listType="picture-card"
            fileList={fileList}
            onChange={handleUpload}
            beforeUpload={() => false} // Prevent automatic upload
            className="flex items-center justify-center rounded-md"
          >
            {fileList.length < 1 && (
              <div className="text-center">
                <UploadOutlined className="text-gray-500" />
                <p className="text-gray-500 text-sm">Upload Image</p>
              </div>
            )}
          </Upload>

          <div className="flex-1 space-y-4">
            <Form.Item
              label="Product Name"
              name="name"
              rules={[
                { required: true, message: "Please enter a product name" },
              ]}
            >
              <Input className="py-3" placeholder="Enter a name" />
            </Form.Item>

            <Form.Item
              label="Estimate Price"
              name="base_price"
              rules={[
                { required: true, message: "Please enter an estimate price" },
              ]}
            >
              <Input type="number" className="py-3" placeholder="Enter an estimate price" />
            </Form.Item>
            <Form.Item
              label="Product Type"
              name="product_type"
              rules={[
                { required: true, message: "Please select a product type" },
              ]}
            >
              <Select placeholder="Select a product type">
                <Select.Option value="xbox">Xbox</Select.Option>
                <Select.Option value="nintendo">Nintendo</Select.Option>
                <Select.Option value="playstation">Playstation</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item
              label="brand"
              name="brand"
              rules={[{ required: true, message: "Enter your brand" }]}
            >
              <Input className="py-3" placeholder="Enter your product brand" />
            </Form.Item>

            {/* Questions Section */}
            {questions.map((question, qIndex) => (
              <div key={qIndex} className="space-y-4">
                <h3 className="text-lg font-semibold">Question {qIndex + 1}</h3>
                <div className="grid grid-cols-2 gap-4">
                  <Form.Item
                    label="Question Name"
                    name={`questionName${qIndex}`}
                    rules={[
                      {
                        required: true,
                        message: "Please enter a question name",
                      },
                    ]}
                  >
                    <Input placeholder="Enter question name" />
                  </Form.Item>
                  <Form.Item
                    label="Question Description"
                    name={`questionDescription${qIndex}`}
                    rules={[
                      {
                        message: "Please enter a question description",
                      },
                    ]}
                  >
                    <Input placeholder="Enter question description" />
                  </Form.Item>
                </div>

                {/* Options Section */}
                <h4 className="text-md font-semibold">Options</h4>
                {question.options.map((option, oIndex) => (
                  <div key={oIndex} className="grid grid-cols-3 gap-4">
                    <Form.Item
                      label={`Option ${oIndex + 1}`}
                      name={`option${qIndex}_${oIndex}`}
                      rules={[
                        { message: "Please enter an option" },
                      ]}
                    >
                      <Input placeholder="Enter option" />
                    </Form.Item>
                    <Form.Item
                      label={`Price ${oIndex + 1}`}
                      name={`price${qIndex}_${oIndex}`}
                      rules={[
                        { required: true, message: "Please enter a price" },
                      ]}
                    >
                      <Input type="number" placeholder="Enter price" />
                    </Form.Item>
                    <Form.Item
                      label={`Description ${oIndex + 1}`}
                      name={`description${qIndex}_${oIndex}`}
                      rules={[
                        {

                          message: "Please enter a description",
                        },
                      ]}
                    >
                      <Input placeholder="Enter description" />
                    </Form.Item>
                  </div>
                ))}

                <Button
                  type="dashed"
                  onClick={() => addOption(qIndex)}
                  className="w-full"
                >
                  Add Another Option
                </Button>
              </div>
            ))}

            <Button type="dashed" onClick={addQuestion} className="w-full">
              Add Another Question
            </Button>

            <div className="flex justify-end gap-2">
              <Button
                className="px-10 py-5"
                danger
                onClick={() => form.resetFields()}
              >
                Cancel
              </Button>
              <Button
                type="primary"
                htmlType="submit"
                className="bg-[#101010] px-10 py-5"
              >
                Save
              </Button>
            </div>
          </div>
        </div>
      </Form>
    </div>
  );
}
