import {Link} from "react-router-dom";
import React from "react";

const AssetAllListTable = ({ index, assets_num, assets_name, category_name, assets_status, spec_num, spec_mfg, spec_seriel, spec_warranty, func }) => {
    return (
        <tr className="prod-box">
            <th>
                <input type={"checkbox"}/>
            </th>
            <th scope="row">{index + 1}</th>
            <td className="assets_name">
                <Link to="/itassets/detail">
                    {assets_name}
                </Link>
            </td>
            <td className="assets_status">{assets_status}</td>
            <td className="spec_mfg">{spec_mfg}</td>
            <td className="spec_seriel">{spec_seriel}</td>
            <th className="spec_warranty">{spec_warranty}</th>
            <th className="category_name">{category_name}</th>
            <th className="spec_num" style={{ display: "none" }}>{spec_num}</th>
            <th className="assets_num" style={{ display: "none" }}>{assets_num}</th>
            <td>
                <button className="btn btn-primary approveBtn" type="button"   data-bs-formtarget="#basicModal" onClick={func} id="approveBtn">사용신청</button>
            </td>
        </tr>
    );
}

export default AssetAllListTable;