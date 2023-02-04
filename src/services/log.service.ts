export class LogService {
  public logFormData(data: any, FormName: string = ''): void {
    const formData: Record<string, string> = {};
    data.forEach((input: HTMLInputElement) => (formData[input.name] = input.value));
    console.log(formData, `data from => ${FormName}`);
  }
}
