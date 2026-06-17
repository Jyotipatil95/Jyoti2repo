import { HeadsetMicRounded } from "@mui/icons-material";

export default function ContactHeader() {
  return (
    <div className="flex items-center space-x-2">
      {/* Icon */}
      <HeadsetMicRounded  className="text-primary fs-1  p-2 " />

      {/* Phone Number */}
      <span className="fs-5 fs-md-6 text-info">
        +1 (832) 989 4525
      </span>
    </div>
  );
}