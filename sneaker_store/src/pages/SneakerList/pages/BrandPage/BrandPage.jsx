import React, { useState } from "react";
import BrandTable from "../BrandPage/components/BrandTable";
import { useGetAllBrands } from "../BrandPage/hooks/useGetAllBrands";
import { useRemoveBrand } from "../BrandPage/hooks/useRemoveBrand";
import { useCreateBrand } from "../BrandPage/hooks/useCreateBrand";
import CreateBrand from "../BrandPage/components/CreateBrand";

const BrandPage = () => {
  const [newBrand, setNewBrand] = useState(null);

  const { brands, setBrands, loading, error } = useGetAllBrands();
  const { removeBrand } = useRemoveBrand(brands, setBrands);
  const { createBrand } = useCreateBrand();

  function nandleNewNameChange(event) {
    setNewBrand({ name: event.target.value });
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!newBrand || !newBrand.name.trim()) {
      return;
    }
    const createdBrand = await createBrand(newBrand);
    setBrands([...brands, createdBrand]);
    setNewBrand(null);
  };

  const filteredBrands = brands.filter((brand) =>
    Object.values(brand).some(
      (value) => typeof value === "string" && value.toLowerCase()
    )
  );

  return (
    <>
      <CreateBrand
        name={newBrand?.name}
        onNameChange={nandleNewNameChange}
        onSubmit={handleSubmit}
      />
      <BrandTable
        brands={brands}
        onRemove={removeBrand}
        setBrands={setBrands}
        filteredBrands={filteredBrands}
      />
    </>
  );
};

export default BrandPage;
