const ResponsiveList = ({
  data = [],
  tableHeader,
  renderTableRow,
  renderCard,
}) => {
  return (
    <>
      {/* ================= TABLE (DESKTOP) ================= */}
      <div className="hidden lg:block bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead className="bg-gray-50 text-gray-600 uppercase text-sm">
            {tableHeader}
          </thead>

          <tbody className="divide-y divide-gray-100">
            {data.map((item, index) => (
              <tr
                key={item.id || index}
                className="hover:bg-gray-50 transition"
              >
                {renderTableRow(item)}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ================= CARD (MOBILE & TABLET) ================= */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:hidden">
        {data.map((item, index) => (
          <div
            key={item.id || index}
            className="bg-white rounded-xl shadow-sm border border-gray-100 p-4"
          >
            {renderCard(item)}
          </div>
        ))}
      </div>
    </>
  );
};

export default ResponsiveList;
