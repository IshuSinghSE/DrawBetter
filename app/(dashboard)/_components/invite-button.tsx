import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { OrganizationProfile } from "@clerk/nextjs";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { Plus } from "lucide-react";

export const InviteButton = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="shadow-soft hover:shadow-md transition-all duration-200 border-gray-300 hover:border-blue-400"
        >
          <Plus className="h-4 w-4 mr-2" />
          Invite Members
        </Button>
      </DialogTrigger>
      <DialogContent className="p-0 bg-transparent border-none w-full max-w-none max-h-[95vh] overflow-hidden lg:max-w-5xl lg:w-auto lg:mx-auto">
        <VisuallyHidden>
          <DialogTitle>Organization Management</DialogTitle>
        </VisuallyHidden>
        <div className="w-full h-full min-h-[600px] overflow-auto lg:overflow-visible">
          <div className="w-full lg:max-w-5xl lg:mx-auto">
            <OrganizationProfile routing="hash" />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
