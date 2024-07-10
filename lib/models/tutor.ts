export class Tutor {
  constructor(
    public id: string | null,
    public name: string,
    public subjects: string[],
    public des: string,
    public pic: string,
    public freeze: boolean,
  ) {}

  static fromMap(data: Record<string, any>, id: string) {
    return new Tutor(
      id,
      data.name,
      data.subjects,
      data.des,
      data.pic,
      data.freeze,
    );
  }

    toMap(): Record<string, any> {
        return {
            name: this.name,
            subjects: this.subjects,
            des: this.des,
            pic: this.pic,
            freeze: this.freeze,
        };
    }
}
