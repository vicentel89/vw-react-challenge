"use client";

import { ReactNode } from "react";
import { PiTrashBold } from "react-icons/pi";

import { IconButton } from "@/app/_common/components/IconButton/IconButton";

import useDeleteCar from "../_api/useDeleteCar";

interface DeleteButtonProps {
  row: Record<string, ReactNode>;
}

export default function DeleteButton({ row }: DeleteButtonProps) {
  const deleteCarMutation = useDeleteCar();

  const handleDelete = () => {
    if (!row.id) return;

    // TODO: Create a confirmation dialog
    if (window.confirm("Are you sure you want to delete this car?")) {
      deleteCarMutation.mutate(String(row.id));
    }
  };

  return (
    <IconButton
      icon={<PiTrashBold />}
      aria-label="Delete car"
      onClick={handleDelete}
      disabled={deleteCarMutation.isPending}
    />
  );
}
