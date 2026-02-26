import { useState, useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

export default function NewsletterTemplatesPage() {
  const [templates, setTemplates] = useState<any[]>([]);
  const [selectedType, setSelectedType] = useState<"welcome" | "unsubscribe">(
    "welcome"
  );
  const [subject, setSubject] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchTemplates();
  }, []);

  const fetchTemplates = async () => {
    const res = await fetch("/api/v1/newsletter/templates");
    const data = await res.json();
    setTemplates(data.data);

    const welcome = data.data.find((t: any) => t.type === "welcome");
    if (welcome) {
      setSubject(welcome.subject);
      setContent(welcome.content);
    }
  };

  const loadTemplate = (type: "welcome" | "unsubscribe") => {
    setSelectedType(type);
    const template = templates.find((t) => t.type === type);
    if (template) {
      setSubject(template.subject);
      setContent(template.content);
    }
  };

  const saveTemplate = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/v1/newsletter/templates/${selectedType}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ subject, content }),
      });

      if (res.ok) {
        alert("Template salvato con successo!");
        fetchTemplates();
      } else {
        alert("Errore nel salvataggio");
      }
    } catch (error) {
      console.error(error);
      alert("Errore di rete");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Gestione Template Newsletter</h1>

      {/* Selettore tipo template */}
      <div className="mb-6 flex gap-4">
        <button
          onClick={() => loadTemplate("welcome")}
          className={`px-4 py-2 rounded ${selectedType === "welcome"
            ? "bg-blue-600 text-white"
            : "bg-gray-200"
            }`}>
          Email Benvenuto
        </button>
        <button
          onClick={() => loadTemplate("unsubscribe")}
          className={`px-4 py-2 rounded ${selectedType === "unsubscribe"
            ? "bg-blue-600 text-white"
            : "bg-gray-200"
            }`}>
          Email Disiscrizione
        </button>
      </div>

      {/* Form modifica */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">
            Oggetto Email
          </label>
          <input
            type="text"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg"
            placeholder="Oggetto dell'email"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">
            Contenuto HTML
          </label>
          <ReactQuill
            theme="snow"
            value={content}
            onChange={setContent}
            className="bg-white"
            style={{ height: "400px", marginBottom: "50px" }}
          />
        </div>

        <div className="bg-gray-100 p-4 rounded mb-4">
          <h3 className="font-semibold mb-2">Variabili disponibili:</h3>
          <ul className="text-sm space-y-1">
            <li>
              <code>{"{{EMAIL}}"}</code> - Email del destinatario
            </li>
            <li>
              <code>{"{{NAME}}"}</code> - Nome del cliente
            </li>
            <li>
              <code>{"{{UNSUBSCRIBE_LINK}}"}</code> - Link disiscrizione
            </li>
            <li>
              <code>{"{{YEAR}}"}</code> - Anno corrente
            </li>
          </ul>
        </div>

        <button
          onClick={saveTemplate}
          disabled={loading}
          className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 disabled:bg-gray-400">
          {loading ? "Salvataggio..." : "Salva Template"}
        </button>
      </div>
    </div>
  );
}
