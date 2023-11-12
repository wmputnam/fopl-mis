export interface SelectOption {
  label: string;
  value: string;
}

export const getOptionByLabel = (options: SelectOption[],label: string): SelectOption => {
  let result = null as unknown as SelectOption;

  if (label) {
    for (let i = 0; i < options.length; i++) {
      if (options[i].label.toLowerCase() === label.toLowerCase()) {
        return options[i];
      }
    }
  }
  return result;
}

export default class SelectOptionHelper {}
