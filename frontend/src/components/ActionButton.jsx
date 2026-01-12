import { MdEdit, MdDelete } from "react-icons/md";

const ActionButton = ({ p, onEdit, onDelete }) => {
  return (
    <>
      {/* DESKTOP (icon only) */}
      <div className="hidden lg:flex gap-2 justify-center">
        <button
          onClick={() => onEdit(p)}
          className="p-2 bg-yellow-50 text-yellow-600 rounded-lg hover:bg-yellow-600 hover:text-white transition"
        >
          <MdEdit size={18} />
        </button>

        <button
          onClick={() => onDelete(p.id)}
          className="p-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-600 hover:text-white transition"
        >
          <MdDelete size={18} />
        </button>
      </div>

      {/* MOBILE & TABLET (button + text) */}
      <div className="flex lg:hidden gap-2 pt-2">
        <button
          onClick={() => onEdit(p)}
          className="flex-1 bg-yellow-100 text-yellow-700 py-2 rounded-lg flex items-center justify-center gap-1"
        >
          <MdEdit size={18} /> Edit
        </button>

        <button
          onClick={() => onDelete(p.id)}
          className="flex-1 bg-red-100 text-red-700 py-2 rounded-lg flex items-center justify-center gap-1"
        >
          <MdDelete size={18} /> Hapus
        </button>
      </div>
    </>
  );
};

export default ActionButton;
