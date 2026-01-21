// 迭代器模式

/**
 * 迭代器模式的核心思想是：把“遍历集合的方式”从“集合本身”中分离出来，
 * 用一个独立对象封装遍历过程，从而在不暴露内部结构的前提下顺序访问元素；
 * 它解决的问题是调用方必须依赖集合内部结构（数组下标、树结构、链表指针、分页游标等）才能遍历，
 * 导致强耦合、难以替换数据结构和遍历策略；适合使用的场景是集合结构复杂或不稳定、
 * 需要多种遍历策略、需要惰性/流式遍历（如数据库游标、树遍历、分页扫描）、
 * 或不希望上层业务代码感知底层存储结构时.
 */


// 传统for循环遍历数组， 依赖数组结构 array.length 与内部实现 array[i]
const array = [1, 2, 3, 4, 5];

for (let i = 0; i < array.length; i++) {
  console.log(array[i]);
}

// 迭代器模式， 通过迭代器接口访问数据结构
// 1. 遍历逻辑与集合结构解耦
// 2. 不同数据结构提供统一遍历方式

interface Iterator<T> {
    next(): { value: T | null; done: boolean };
}

class ArrayIterator<T> implements Iterator<T> {
    private index = 0;

    constructor(private array: T[]) {}

    next(): { value: T | null; done: boolean } {
        if (this.index < this.array.length) {
            return { value: this.array[this.index++] ?? null, done: false };
        } else {
            return { value: null, done: true };
        }
    }

    forEach(callback: (item: T) => void) {
        let hasNext = true;
        do {
            const item = this.next();
            hasNext = item.done;
            if (!item.done && item.value !== null) {
                callback(item.value);
            }
        } while (hasNext === false);
    }
}

class ObjectValueIterator implements Iterator<string> {
    private keys: string[]

    private index = 0;

    constructor(private obj: Record<string, any>) {
        this.keys = Object.keys(obj);
    }

    next(): { value: string | null; done: boolean } {
        if (this.index < this.keys.length) {
            return { value: this.keys[this.index++] ?? null, done: false };
        } else {
            return { value: null, done: true };
        }
    }
}

const stringArray = new ArrayIterator<string>(['a', 'b', 'c']);

const numberArray = new ArrayIterator<number>([1, 2, 3, 4, 5]);

const objValueMap  = new ObjectValueIterator({a: '1', b: '2', c: '3'});

function main(){
    let hasNext = true;
    do {
        const item = stringArray.next();
        hasNext = item.done;
        if (!item.done)
        console.log(item.value);
    } while (hasNext === false);

    hasNext = true;
    do {
        const item = objValueMap.next();
        hasNext = item.done;
        if (!item.done)
        console.log(item.value);
    } while (hasNext === false);

    numberArray.forEach((item) => {
        console.log(item);
    });
}

main();
