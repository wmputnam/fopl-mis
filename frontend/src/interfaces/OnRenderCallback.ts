export interface RenderCallBackI {
  id?: string;
  phase?: "mount" | "update" | "nested-update";
  actualDuration?: number;
  baseDuration?: number;
  startTime?: number;
  endTime?: number;
}

export const onRenderCallback = (
  { id, phase }: Partial<RenderCallBackI>
): void => {
  id && phase && console.log(`${id} ${phase}`)
}
