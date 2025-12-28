import { useParams } from "react-router-dom";

export default function MenuPage() {
  const { category } = useParams();

  const formattedCategory = category.replace("-", " ");

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold capitalize mb-6">
        {formattedCategory}
      </h1>
    </div>
  );
}