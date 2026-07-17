import { formatNumber } from "../utils";

const ProductTable = ({ products, totalRevenue }) => (
  <table>
    <thead>
      <tr>
        <th>Product Name</th>
        <th>Total Revenue</th>
      </tr>
    </thead>
    <tbody>
      {products.map((p) => (
        <tr key={p.name}>
          <td>{p.name}</td>
          <td>{formatNumber(p.totalRevenue)}</td>
        </tr>
      ))}
    </tbody>
    <tfoot>
      <tr>
        <td>
          <strong>Total Revenue :</strong>
        </td>
        <td>
          <strong>{formatNumber(totalRevenue)}</strong>
        </td>
      </tr>
    </tfoot>
  </table>
);
export default ProductTable;
