import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog'
import { ScrollArea } from '@/components/ui/scroll-area'

export const Modal = ({
    modalState,
    title,
    onClose,
    size = 'md',
    children,
}) => {
    const handleOpenChange = () => {
        modalState.toggle()
        if (onClose) {
            onClose()
        }
    }

    const sizes = {
        sm: 'md:max-w-sm',
        md: 'md:max-w-md',
        lg: 'md:max-w-lg',
        xl: 'md:max-w-xl',
        '2xl': 'md:max-w-2xl',
        '3xl': 'md:max-w-3xl',
        '4xl': 'md:max-w-4xl',
        '5xl': 'md:max-w-5xl',
        '6xl': 'md:max-w-6xl',
        '7xl': 'md:max-w-7xl',
        '8xl': 'md:max-w-8xl',
        full: 'w-full',
    }

    return (
        <Dialog
            asChild
            open={modalState.isOpen}
            onOpenChange={handleOpenChange}
        >
            <DialogContent className={sizes[size]}>
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                    <DialogDescription></DialogDescription>
                </DialogHeader>
                <ScrollArea className={`max-h-[80vh] mx-3 pr-2.5`}>
                    {children}
                </ScrollArea>
            </DialogContent>
        </Dialog>
    )
}
