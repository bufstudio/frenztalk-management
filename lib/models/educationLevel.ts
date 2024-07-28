export class EducationLevel {
    constructor(
        public id: string | null,
        public name: string,
    ) { }

    static fromMap(data: Record<string, any>, id: string) {
        return new EducationLevel(
            id,
            data.name,
        );
    }

    toMap(): Record<string, any> {
        return {
            name: this.name,
        };
    }
}
