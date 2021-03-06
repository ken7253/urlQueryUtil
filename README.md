# URL Query Util

## Feature
このモジュールではURL引数を扱う複数のメソッドを提供します。  

## Methods
### data

`urlQueryUtil.data()` メソッドはURL引数を指定された型に変換して返却します。  

#### Samle URL
```
https://example.com?string=hoge&boolean=ture&number=000
```

```javascript
urlQueryUtil.data(dataType["string" | "array" | "object"]);

/* =============================================

    dataType: string
    =>  string=hoge&boolean=ture&number=000
    dataType: array
    =>  ["string=hoge", "boolean=ture", "number=000"]
    dataType: object
    =>  {"string": "hoge", "boolean": ture, "number": "000"}
    dataType: other
    =>  error: urlQueryUtil.data argument is not a valid value.

=============================================  */
```
#### 引数
`dataType` 引数は返却される値を指定します。  

|       args | return                                |
|      ----: | :------------------------------------ |
| `"string"` | URL引数をそのまま文字列で返却         |
|  `"array"` | 各項目を配列として返却                |
| `"object"` | 各プロパティをkeyとvalueに代入して返却|  

また各引数は文字列で指定してください。  

### setCssVar
#### Samle URL
```
https://example.com?color=%23fff&fs=16px
```

*URL引数の中にハッシュ ( # ) を含める場合は必ずエスケープをした文字列 ( %23 ) を使用してください。*

`urlQueryUtil.setCssVar()` メソッドは指定した要素で [CSS変数](https://developer.mozilla.org/ja/docs/Web/CSS/Using_CSS_custom_properties) を宣言させます。  
`targetElement` 引数を省略した場合その変数は `:root` での宣言となります。  

```javascript
urlQueryUtil.setCssVar(
    tagetProp([property_1,property_2 ...] || ["all"]),
    targetElement // option
);
```

```css
:root {
    --color: #fff;
    --fs: 16px;
}
```
#### 引数
- `tagetProp`  
  - Array => 指定されたプロパティのみを展開します。  
  - \["all"\] => すべてのプロパティを展開します。  
    *※allでの展開は便利ですが意図しない変数の宣言を行う可能性があるため原則的には配列で指定してください*
- `targetElement` *option*
  - "css selector" => 指定したセレクタにて変数を宣言させます。
  - default => `:root` での宣言になります。
