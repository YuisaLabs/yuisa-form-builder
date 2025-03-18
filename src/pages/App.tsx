import { DndProvider } from "react-dnd";
import FormBuilder from "../components/Form/FormBuilder";
import { HTML5Backend } from "react-dnd-html5-backend";

function App() {
  return (
    <DndProvider backend={HTML5Backend}>
      <main className="container mx-auto py-10 px-4">
        <h1 className="text-4xl font-bold mb-4">Yuisa Form Builder</h1>
        <FormBuilder />
      </main>
    </DndProvider>
  );
}

export default App;
