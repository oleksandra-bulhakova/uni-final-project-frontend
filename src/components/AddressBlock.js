import React from "react";

function AddressBlock({address}) {
    if (!address) {
        return (<button className="bg-[#FE7C7C] hover:bg-[#58618E] text-white px-4 py-2 rounded text-xl">
            Додати адресу
        </button>);
    }

    const {country, city, street, building, apartment} = address;

    return (
        <div className="border p-4 rounded-md shadow-sm">
            <h2 className="text-lg font-semibold mb-2">Address</h2>
            <p>{country || "-"}</p>
            <p>{city || "-"}</p>
            <p>
                {street || "-"} {building && `bld. ${building}`} {apartment && `apt. ${apartment}`}
            </p>
        </div>
    );
}

export default AddressBlock;