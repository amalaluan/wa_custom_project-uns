import React from "react";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";

const TAIWT = ({ label, ps }) => {
  return (
    <div className="grid w-full gap-1.5">
      <p className="mt-2 text-sm">{label}</p>
      <Textarea
        placeholder="Type your answer here."
        className="focus-visible:ring-transparent"
        id="message-2"
        rows={5}
      />
      <p className="text-sm text-muted-foreground">{ps}</p>
    </div>
  );
};

export default TAIWT;
