## 粗略了解TypeScript语法

## 开发环境

轻量服务器：npm install lite-server --save-dev



### 接口

##### 1. 对变量使用

```typescript
interface User {
   name: string;
    age: nubmer;
}

const user: User {
    name: '千条哥',
    age: 45,
}
```

##### 2. 对函数返回值使用

```tsx
function getUser(): User {
//...
}
```





## Composing types

```tsx
type MyBool = true | false
```



### 泛型 Generics

```typescript
type StringArray = Array<string>;
type ObjectWithNameArray = Array<{ name: string }>;

interface Backpack<Type> {
  add: (obj: Type) => void;
  get: () => Type;
}
declare const backpack: Backpack<string>;
const object = backpack.get()
```

