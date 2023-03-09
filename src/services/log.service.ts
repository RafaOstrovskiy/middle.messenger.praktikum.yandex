export class LogService {
  public logFormData(data: any): Array<any> {
    const formData: Array<any> = [];
    data.forEach((input: HTMLInputElement) => formData.push([input.name, input.value]));
    // console.log(formData, `data from => ${FormName}`);
    return formData;
  }
}
