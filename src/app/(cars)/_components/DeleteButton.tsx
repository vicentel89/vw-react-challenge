"use client";

import { ReactNode } from "react";
import { PiTrashBold } from "react-icons/pi";

import Button from "@/app/_common/components/Button/Button";
import { IconButton } from "@/app/_common/components/IconButton/IconButton";
import { Modal } from "@/app/_common/components/Modal/Modal";
import { useToggle } from "@/app/_common/hooks/useToggle";

import styles from "./DeleteButton.module.css";
import useDeleteCar from "../_api/useDeleteCar";

interface DeleteButtonProps {
  row: Record<string, ReactNode>;
}

export default function DeleteButton({ row }: DeleteButtonProps) {
  const { isOpen: isModalOpen, toggle: toggleModal } = useToggle();
  const deleteCarMutation = useDeleteCar();

  const handleDelete = () => {
    if (!row.id) return;

    deleteCarMutation.mutate(String(row.id));
    toggleModal();
  };

  return (
    <>
      <IconButton
        icon={<PiTrashBold />}
        aria-label="Delete car"
        onClick={toggleModal}
        disabled={deleteCarMutation.isPending}
      />

      <Modal isOpen={isModalOpen} onClose={toggleModal}>
        <h2 className={styles.modalTitle}>Delete Car</h2>
        <p>Are you sure you want to delete this car?</p>
        <div className={styles.modalButtonContainer}>
          <Button variant="outline" onClick={toggleModal}>
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={handleDelete}
            disabled={deleteCarMutation.isPending}
          >
            Delete
          </Button>
        </div>
      </Modal>
    </>
  );
}
