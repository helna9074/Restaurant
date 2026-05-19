
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
interface Props{
  open:boolean,
  onClose:()=>void;
  children:React.ReactNode;
  title?:string
  width?:string
}
export function Modal({open,onClose,children,title,width}:Props) {
  return (
    <Dialog open={open} onOpenChange={onClose} >
      
      <DialogContent className={`${width? width:"max-w-[60vw]!  max-h-[80vh]!"}  sm-max-w-[20vw]!  no-scrollbar  bg-modal/30 backdrop-blur-2xl z-100  overflow-y-auto scroll-smooth whitespace-nowrap`}>
        <DialogHeader>
          <DialogTitle className="font-bold text-2xl text-center">{title}</DialogTitle>
        </DialogHeader>
       {children}
      </DialogContent>
    </Dialog>
  );
}
