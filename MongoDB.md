# **MongoDB**

## **ORM**

Object-Relational Mapping

ORM là thư viện viết bằng ngôn ngữ tự chọn, đóng gói mã cần thiết để thao tác dữ liệu, vì vậy không sử dụng SQL nữa mà tương tác trực tiếp với đối tượng bằng cùng ngôn ngữ đang sử dụng

Object-Relational Mapping (ORM) là một lớp phần mềm nhằm mục đích trừu tượng hóa biểu diễn cơ sở dữ liệu của một đối tượng bằng ngôn ngữ phần mềm (PHP, Python, Ruby, Java, JavaScript) và thường xử lý các khái niệm như lưu trữ và tìm nạp các biểu diễn đối tượng đến và đi từ cơ sở dữ liệu, cũng như quản lý và duyệt qua các đối tượng hoặc mối quan hệ được liên kết bằng cách sử dụng một giao diện thường tránh sử dụng các cấu trúc SQL một cách rõ ràng. ORM che giấu thực tế là các đối tượng được lưu trữ trong cơ sở dữ liệu và nếu được viết đúng cách, nó có thể sửa đổi minh bạch trình điều khiển cơ sở dữ liệu được sử dụng để làm việc với một hoặc nhiều cơ sở dữ liệu mà không cần chương trình gọi biết sự thay đổi đã xảy ra.

```php
book_list = BookTable.query(author="Linus");
```

## **Drivers**

A driver for a database thường là lớp tiếp theo bên dưới ORM trong đó nó thường xử lý các chức năng cấp thấp hơn nhiều khi làm việc với cơ sở dữ liệu, chẳng hạn như kết nối, cấu hình, chạy các truy vấn trên cơ sở dữ liệu bao gồm các câu lệnh SQL và truy vấn liên quan của chúng và kết quả. Nói chung, khi sử dụng a database driver interface, phần lớn tương tác với interface sẽ sử dụng SQL để giao tiếp với cơ sở dữ liệu và các driver calls để gửi dữ liệu và truy vấn, đồng thời truy xuất các tập kết quả truy vấn từ cơ sở dữ liệu.

## ORMs vs Drivers

## Schema

Schema là một JSON Object xác định cấu trúc và nội dung dữ liệu.

```php
var mongoose = require("mongoose");
var Schema = mongoose.Schema;
 
var blogSchema = new Schema({
  title: String, // String is shorthand for {type: String}
  author: String,
  body: String,
  comments: [{ body: String, date: Date }],
  date: { type: Date, default: Date.now },
  hidden: Boolean,
  meta: {
    votes: Number,
    favs: Number
  }
});

//Them gia tri
blogSchema.add({ views: 'number', report: 'number'});
```

Để sử dụng được một Schema, chúng ta cần chuyển thành một Model mới có thể làm việc với nó.

```php
mongoose.model(modelName, Schema);
```

Các method có thể được chỉ định trong Schema để giúp thực hiện những việc liên quan đến Schema Document đó và giữ cho các đoạn code được tổ chức rõ ràng hơn.

```php
// Khởi tạo một Schema
var animalSchema = new Schema({ name: String, type: String });
 
// Gán một hàm cho object 'methods' của animalSchema
// Schema.method() va Schema.methods ket qua ra ve giong nhau
animalSchema.methods.findSimilarTypes = function(cb) {
  return this.model("Animal").find({ type: this.type }, cb);
};

// Su dung ham
var Animal = mongoose.model('Animal', animalSchema);
var dog = new Animal({ type: 'dog' });
 
dog.findSimilarTypes(function(err, dogs) {
  console.log(dogs); // woof
});
```

Lưu ý khi sử dụng instance methods mà mongoose

* Không nên ghi đè một document.
* Trong ví dụ trên mình sử dụng Schema.methods, ngoài ra còn có thể sử dụng phương thức Schema.method() để thay thế. Hai kết quả tra về như nhau.
* Không chỉ định method bằng arrow function ( => {} ) trong ES6, bởi arrow function không hỗ trợ biến this

Query Helpers là một phương thức giúp bạn có thể mở rộng các câu truy vấn của bạn, giống như là Instance method nhưng thay vào đó sử dụng cho các câu truy vấn.

```php
animalSchema.query.byName = function(name) {
  return this.where({ name: new RegExp(name, 'i') });
};
 
var Animal = mongoose.model('Animal', animalSchema);
 
Animal.find().byName('fido').exec(function(err, animals) {
  console.log(animals);
});
 
Animal.findOne().byName('fido').exec(function(err, animal) {
  console.log(animal);
});
```

Schema Type

* String

```php
const schema1 = new Schema({ name: String }); // name will be cast to string
const schema2 = new Schema({ name: 'String' }); // Equivalent
```

* Number
* Date
* Buffer

 ```php
 const schema2 = new Schema({ binData: 'Buffer' });

const Data = mongoose.model('Data', schema2);

const file1 = new Data({ binData: 'test'}); // {"type":"Buffer","data":[116,101,115,116]}
```

* Boolean
* Mixed
* ObjectId: là type đặc biệt, thường được sử dụng cho identiters duy nhất

```php
const carSchema = new mongoose.Schema({ driver: mongoose.ObjectId });
```

Object là 1 class và Objects là Objects. Nhưng thường thể hiện dạng chuỗi, để convert ObjectId to String sử dụng toString()

```php
const Car = mongoose.model('Car', carSchema);

const car = new Car();
car.driver = new mongoose.Types.ObjectId();

typeof car.driver; // 'object'
car.driver instanceof mongoose.Types.ObjectId; // true

car.driver.toString(); // Something like "5e1a0651741b255ddda996c4"
```

* Array
* Decimal128: được sử dụng để khai báo đường dẫn phải là dấu chấm động thập phân 128 bit

```php
const vehicleSchema = new Schema({ fuelLevel: mongoose.Decimal128 });
```

* Map

## CRUD

## Populate

Populate là quá quá trình tự động thay thế các paths trong documents gốc bằng cách documents trong các documents khác. Chúng ta có thể gộp một hay nhiều document, objects hay tất cả object từ một query.

```php
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
 
const personSchema = Schema({
  _id: Schema.Types.ObjectId,
  name: String,
  age: Number,
  stories: [{ type: Schema.Types.ObjectId, ref: 'Story' }]
});
 
const storySchema = Schema({
  author: { type: Schema.Types.ObjectId, ref: 'Person' },
  title: String,
  fans: [{ type: Schema.Types.ObjectId, ref: 'Person' }]
});
 
const Story = mongoose.model('Story', storySchema);
const Person = mongoose.model('Person', personSchema);
```

Chúng ta tạo 2 Model. Model Person của chúng ta có trường stories là một mảng ObjectId, ref là một option để cho mongoose có thể hiểu là nó liên kết với model nào và ở đây là Story. All _id của mà chúng ta lưu ở trường stories phải nằm trong_id của Story model. ObjectId, Number, String và Buffer đều có thể là ref, nhưng để tối ưu tốc độ truy vấn thì chúng ta lên dùng ObjectId.

### 1. Saving refs

Để lưu refs, cũng giống như là lưu một document thông thường, chúng ta chỉ cần gián giá trị _id:

```php
const author = new Person({
  _id: new mongoose.Types.ObjectId(),
  name: 'Ian Fleming',
  age: 50
});

author.save(function (err) {
  if (err) return handleError(err);

  const story1 = new Story({
    title: 'Casino Royale',
    author: author._id    // gián giá trị _id cho person
  });

  story1.save(function (err) {
    if (err) return handleError(err);
  });
});
```

### 2.Population

```php
Story.
  findOne({ title: 'Casino Royale' }).
  populate('author').
  exec(function (err, story) {
    if (err) return handleError(err);
    console.log(story);
  });
  ```

  Kết quả trả về:

  ```php
  {
    _id: ..,
    title: 'Casino Royale',
    author: {
        _id: ..,
        name: 'Ian Fleming',
        age: 50
    }
}
  ```

## Design relationship

## MongoDB is DB type ?, compare with DB other

No SQL

## Index

## Aggregation
