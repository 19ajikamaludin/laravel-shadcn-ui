import { Button } from '@/components/ui/button'
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'

export const ModalConfirm = ({ modalState, onConfirm }) => {
    const handleConfirm = () => {
        modalState.toggle()
        onConfirm()
    }

    return (
        <Dialog
            open={modalState.isOpen}
            onOpenChange={modalState.toggle}
        >
            <DialogContent className="md:max-w-md">
                <DialogHeader>
                    <DialogTitle>Are you sure you want to delete Item?</DialogTitle>
                </DialogHeader>

                <DialogFooter className="gap-2">
                    <DialogClose asChild>
                        <Button variant="secondary">Batal</Button>
                    </DialogClose>

                    <Button
                        variant="destructive"
                        className="bg-red-600"
                        asChild
                    >
                        <button onClick={handleConfirm}>Hapus</button>
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
