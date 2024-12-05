import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";

import {
  useCities,
  useDistricts,
  useNeighborhoods,
  useStreets,
} from "../../hooks/useAddress";
import { useCreateAddress } from "./useCreateAddress";
import { useEditAddress } from "./useEditAddress";

import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Button from "../../ui/Button";
import Input from "../../ui/Input";
import Select from "../../ui/Select";
import TextArea from "../../ui/TextArea";
import Spinner from "../../ui/Spinner";

const StyledAddressForm = styled(Form)`
  && {
    & .btn-box {
      display: flex;
      gap: 2rem;
    }

    @media (min-width: 992px) {
      width: 600px;
    }
  }
`;

const StyledSelect = styled(Select)`
  && {
    width: 100%;

    @media (min-width: 992px) {
      max-width: 335px;
    }
  }
`;

function AddressForm({ address = {}, onCloseModal }) {
  const { isPending: isCreating, createAddress } = useCreateAddress();
  const { isPending: isEditing, editAddress } = useEditAddress();
  const isWorking = isCreating || isEditing;

  const [fetchCount, setFetchCount] = useState(0);

  const { id: editId, ...editValues } = address;

  const isEditSession = Boolean(editId);

  const { register, handleSubmit, watch, reset, formState } = useForm({
    defaultValues: isEditSession
      ? { ...editValues }
      : {
          addressTitle: "",
          city: "",
          district: "",
          neighborhood: "",
          street: "",
          addressLine1: "",
          addressLine2: "",
          isDefault: false,
        },
  });

  const selectedCity = watch("city");
  const selectedDistrict = watch("district");
  const selectedNeighborhood = watch("neighborhood");

  const { data: cities, isLoading: isCitiesLoading } = useCities();

  const { data: districts, isLoading: isDistrictsLoading } =
    useDistricts(selectedCity);

  const { data: neighborhoods, isLoading: isNeighborhoodsLoading } =
    useNeighborhoods(selectedCity, selectedDistrict);

  const { data: streets, isLoading: isStreetsLoading } = useStreets(
    selectedCity,
    selectedNeighborhood.replace(" MAHALLESİ", "")
  );

  const isFetching =
    isCitiesLoading ||
    isDistrictsLoading ||
    isNeighborhoodsLoading ||
    isStreetsLoading;

  useEffect(() => {
    setFetchCount((count) => count + 1);
  }, [isFetching]);

  const { errors } = formState;

  function onSubmit(data) {
    if (isEditSession)
      editAddress(
        { addressData: data, addressId: editId },
        {
          onSuccess: (data) => {
            reset();
            onCloseModal?.();
          },
        }
      );
    else
      createAddress(data, {
        onSuccess: (data) => {
          reset();
          onCloseModal?.();
        },
      });
  }

  function onError(errors) {
    console.log(errors);
  }

  if (isFetching && fetchCount < 3)
    return (
      <Spinner.Container>
        <Spinner />
      </Spinner.Container>
    );

  return (
    <StyledAddressForm onSubmit={handleSubmit(onSubmit, onError)}>
      <h2 className="mb-5">
        {isEditSession
          ? `Edit "${address.addressTitle}" address`
          : "Create New Address"}
      </h2>

      <FormRow label="Address Title" error={errors?.addressTitle?.message}>
        <Input
          disabled={isFetching}
          type="text"
          id="addressTitle"
          {...register("addressTitle", {
            required: "Address title is required",
          })}
          placeholder="e.g., Home, Office"
        />
      </FormRow>

      <FormRow label="City" error={errors?.city?.message}>
        <StyledSelect
          id="city"
          disabled={isFetching}
          register={register("city", { required: "City is required" })}
          options={cities?.map((city) => ({
            value: city.ilAdi,
            label: city.ilAdi,
          }))}
        />
      </FormRow>

      <FormRow label="District" error={errors?.district?.message}>
        <StyledSelect
          id="district"
          disabled={!selectedCity && isFetching}
          register={register("district", { required: "District is required" })}
          options={districts?.map((district) => ({
            value: district.ilceAdi,
            label: district.ilceAdi,
          }))}
        />
      </FormRow>

      <FormRow label="Neighborhood" error={errors?.neighborhood?.message}>
        <StyledSelect
          id="neighborhood"
          disabled={isFetching && !selectedDistrict}
          register={register("neighborhood", {
            required: "Neighborhood is required",
          })}
          options={neighborhoods?.map((neighborhood) => ({
            value: neighborhood.mahalleAdi,
            label: neighborhood.mahalleAdi,
          }))}
        />
      </FormRow>

      <FormRow label="Street" error={errors?.street?.message}>
        <StyledSelect
          id="street"
          disabled={isFetching && !selectedNeighborhood}
          register={register("street", { required: "Street is required" })}
          options={streets?.map((street) => ({
            value: street.sokakAdi,
            label: street.sokakAdi,
          }))}
        />
      </FormRow>

      <FormRow label="Address Line 1" error={errors?.addressLine1?.message}>
        <TextArea
          disabled={isFetching}
          id="addressLine1"
          {...register("addressLine1", {
            required: "Address Line 1 is required",
          })}
          placeholder="Enter your address (e.g., Apartment number, floor)"
        />
      </FormRow>

      <FormRow label="Address Line 2 ">
        <TextArea
          disabled={isFetching}
          id="addressLine2"
          {...register("addressLine2")}
          placeholder="Enter additional address details (e.g., landmark)"
        />
      </FormRow>

      <FormRow label="Default Address">
        <Input
          id="default"
          disabled={isFetching}
          type="checkbox"
          {...register("isDefault")}
        />
      </FormRow>

      <div className="btn-box">
        <Button
          disabled={isFetching && isWorking}
          type="reset"
          onClick={() => onCloseModal?.(false)}
        >
          Cancel
        </Button>
        <Button type="submit" disabled={isWorking && isFetching}>
          {isEditSession ? "Save Address" : "Create Address"}
        </Button>
      </div>
    </StyledAddressForm>
  );
}

export default AddressForm;
