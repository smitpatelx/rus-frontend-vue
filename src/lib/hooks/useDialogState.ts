import { onMounted, watch } from 'vue';
import type { Ref } from 'vue';

type CompositionProps = {
  dialogRef: Ref<HTMLDialogElement | null>;
  isDialogOpen: { value: boolean };
  openDialog: () => void;
  closeDialog: () => void;
};

export const useDialogState = ({
  dialogRef,
  isDialogOpen,
  openDialog,
  closeDialog,
}: CompositionProps) => {
  // React on isDialogOpen
  watch([isDialogOpen], () => {
    if (isDialogOpen.value) {
      openDialog();
    } else {
      dialogRef.value?.close();
    }
  });

  onMounted(() => {
    const overlay = dialogRef.value;

    if (overlay) {
      overlay.addEventListener('close', () => {
        closeDialog();
      });
      overlay.addEventListener('click', () => {
        closeDialog();
      });
    }

    return () => {
      if (overlay) {
        overlay.removeEventListener('close', () => {
          closeDialog();
        });
        overlay.removeEventListener('click', () => {
          closeDialog();
        });
      }
    };
  });
};
