
type ShiftStatusType = "approved" | "denied" | "pending" | "posted" | "called-off";

interface ShiftStatus {
  type: ShiftStatusType;
  label: string;
}

interface ShiftCovering {
  for: string;
  by: string;
}

interface Shift {
  id: string;
  employeeId: string;
  day: string;
  startTime: string;
  endTime: string;
  position: string;
  duration: string;
  status: ShiftStatus;
  note?: string;
  covering?: ShiftCovering;
  conflict?: boolean;
}

export { Shift, ShiftStatus, ShiftStatusType, ShiftCovering };
