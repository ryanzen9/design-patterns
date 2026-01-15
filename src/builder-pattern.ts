// 构造器模式

// 复杂对象的声明创建由于属性过多十分繁琐

/**
 * 生成器模式的核心思想是将复杂对象的构建逻辑与表现形式分离，通过链式调用或指挥者角色，实现分步骤、可配置地创建对象，
 * 其本质是把原本臃肿的构造函数转化为一种更具可读性和灵活性的流式操作。
 * 它主要解决了“构造函数爆炸”的问题（即当参数过多或存在大量可选参数时，代码变得难以阅读和维护）
 * 以及对象状态不一致的风险（即避免在对象尚未完全赋值前就被错误引用），同时也让创建不可变对象变得更加优雅。
 * 最适合使用的场景是当一个类的构造参数超过 4 个且包含可选属性，或者对象的构建需要执行严格的业务校验逻辑，
 * 亦或是你希望通过相同的构建过程生产出具有不同配置的多种产品时。
 */

class Product {
    partA: string;
    partB: string;
    partC?: string;

    constructor() {
        this.partA = '';
        this.partB = '';
    }

    static create(a: string, b: string, c?: string): Product {
        const product = new Product();
        product.partA = a;
        product.partB = b;
        if (c) {
            product.partC = c;
        }
        return product;
    }
}


class BuilderProduct {
    private readonly partA: string;
    private readonly  partB: string;
    private readonly  partC: string | undefined;

    constructor(
        partA: string,
        partB: string,
        partC?: string
    ) {
        this.partA = partA;
        this.partB = partB;
        this.partC = partC || undefined;
    }

    // 首步构造需要必填参数
    static Builder= class {
        partA: string;
        partB: string;
        partC?: string;

        constructor(a: string, b: string) {
            this.partA = a;
            this.partB = b;
        }

        setPartC(c: string): this {

            // 同时还可以在此处做特殊逻辑处理
            if (c.length > 10) {
                throw new Error('partC length exceed 10');
            }

            this.partC = c;
            return this;
        }

        setPartA(a: string): this {
            this.partA = a;
            return this;
        }

        setPartB(b: string): this {
            this.partB = b;
            return this;
        }

        build(): BuilderProduct {
            return new BuilderProduct(this.partA, this.partB, this.partC);
        }
    }
}


const product1 = Product.create('A1', 'B1', 'C1');

const product2 = new BuilderProduct.Builder('A2', 'B2')
    .setPartC('C2')
    .build();

const product3 = new BuilderProduct.Builder('A3', 'B3')
    .build();

console.log(product1);
console.log(product2);
console.log(product3);

export { };
