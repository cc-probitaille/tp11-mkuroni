import { creerClasseDynamique } from "../creerClasseDynamique";

describe("String calculator", () => {
    
    const propOuMeth = {
        sum: 0,
        extractCustomDelimiter(input: string): string {
            return input[2];
          },
        splitInput(input: string): number[] {
            const defaultDelimiters = /[,\n]/;
            let customDelimiter: string | undefined;
        
            // Vérifie si un délimiteur personnalisé est spécifié
            if (input.startsWith('//')) {
              customDelimiter = this.extractCustomDelimiter(input);
              // Retire la ligne de définition du délimiteur personnalisé
              input = input.split('\n').slice(1).join('\n');
            }
        
            const inputArray = customDelimiter 
              ? input.split(customDelimiter) 
              : input.split(defaultDelimiters);
        
            return inputArray.map(Number);
          },
          add(input: string): number {
            if (input.length > 0) {
              const numbers = this.splitInput(input);
              numbers.forEach((value) => (this.sum += value));
            }
            return this.sum;
          }
    };
        
    const stringCalc = creerClasseDynamique(propOuMeth);
        
  beforeEach(() => {
    stringCalc.sum = 0;
  });

  it("should take an empty string", () => {
    const result = stringCalc.add("");
    expect(result).toBe(0);
  });

  it("should return the value when passed only one", () => {
    const result = stringCalc.add("1");
    expect(result).toBe(1);
  });

  it("should add a string with 2 values", () => {
    const result = stringCalc.add("1,2");
    expect(result).toBe(3);
  });

  it('should add a string with a baggilion #s', () => {
    const result = stringCalc.add("1,2,3,4");
    expect(result).toBe(10);
  })

  it('should handle new lines and commas', () => {
    const result = stringCalc.add("1,2\n3,4");
    expect(result).toBe(10);
    
  })

  it('should support custom delimiters outline by //', () => {
    const result = stringCalc.add("//;\n1;2");
    expect(result).toBe(3);
    
  })
});
