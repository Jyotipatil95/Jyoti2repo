import { HeadsetMicRounded } from "@mui/icons-material";

export default function ContactHeader() {
  return (
    <div className="flex items-center space-x-2">
      {/* Icon */}
      <HeadsetMicRounded className="text-blue-900 text-3xl" />

      {/* Phone Number */}
      <span className="text-lg md:text-xl text-cyan-500">
        +1 (832) 989 4525
      </span>
    </div>
  );
}