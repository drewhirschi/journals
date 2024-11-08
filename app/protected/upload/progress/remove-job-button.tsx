"use client"
import { Button } from "@/components/ui/button";
import { browswerClient } from "@/utils/supabase/client";
import { Trash2 } from "lucide-react";
import { removeJob } from "./actions";

export const RemoveJobButton = ({ jobId }: { jobId: string }) => {





    return (
        <Button
            className="float-right m-2"
            variant="destructive"
            onClick={() => removeJob("image-uploads", jobId)}
            aria-label={`Remove job ${jobId}`}
        >
            <Trash2 size={16} />
        </Button>
    );
};
