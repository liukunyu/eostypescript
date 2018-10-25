enum Sex {
    man,
    woman
}

class Student {
    Name: string
    Age: number
    Sex: Sex

    constructor(Name: string, Age: number, Sex: Sex) {
        this.Name = Name;
        this.Age = Age;
        this.Sex = Sex;
    }
}

let Students: Student[] = [] as Student[];
Students.push(new Student('lux', 18, Sex.man));

    // { Name: 'lux', Age: 18, Sex: Sex.man },
    // { Name: 'hey', Age: 21, Sex: Sex.man },
    // { Name: 'haha', Age: 23, Sex: Sex.woman },
    // { Name: 'yo', Age: 19, Sex: Sex.woman }


// function orderby<Titem, Tvalue>(arr: Titem[], selector: (i: Titem) => Tvalue): Titem[]


function orderby<Titem, Tvalue>(arr: Titem[], selector: (i: Titem) => Tvalue): Titem[] {
    if (arr.length <= 1) {
        return arr;
    }
    const pivotIndex = Math.floor(arr.length / 2);
    const pivot = arr.splice(pivotIndex, 1)[0];
    const left = [] as Titem[];
    const right = [] as Titem[];

    for (let i of arr) {
        if (selector(i) < selector(pivot)) {
            left.push(i);
        } else {
            right.push(i);
        }
    }
    return orderby(left, selector).concat([pivot], orderby(right, selector));
}

const StudentOrderbyAge = orderby(Students, i => i.Age);
console.log(StudentOrderbyAge);
