# **MongoDB**

## **ORM**

Object-Relational Mapping

ORM là thư viện viết bằng ngôn ngữ tự chọn, đóng gói mã cần thiết để thao tác dữ liệu, vì vậy không sử dụng SQL nữa mà tương tác trực tiếp với đối tượng bằng cùng ngôn ngữ đang sử dụng

Object-Relational Mapping (ORM) là một lớp phần mềm nhằm mục đích trừu tượng hóa biểu diễn cơ sở dữ liệu của một đối tượng bằng ngôn ngữ phần mềm (PHP, Python, Ruby, Java, JavaScript) và thường xử lý các khái niệm như lưu trữ và tìm nạp các biểu diễn đối tượng đến và đi từ cơ sở dữ liệu, cũng như quản lý và duyệt qua các đối tượng hoặc mối quan hệ được liên kết bằng cách sử dụng một giao diện thường tránh sử dụng các cấu trúc SQL một cách rõ ràng. ORM che giấu thực tế là các đối tượng được lưu trữ trong cơ sở dữ liệu và nếu được viết đúng cách, nó có thể sửa đổi minh bạch trình điều khiển cơ sở dữ liệu được sử dụng để làm việc với một hoặc nhiều cơ sở dữ liệu mà không cần chương trình gọi biết sự thay đổi đã xảy ra.

```php
book_list = BookTable.query(author="Linus");
```

## **Drivers**

A driver for a database thường là lớp tiếp theo bên dưới ORM trong đó nó thường xử lý các chức năng cấp thấp hơn nhiều khi làm việc với cơ sở dữ liệu, chẳng hạn như kết nối, cấu hình, chạy các truy vấn trên cơ sở dữ liệu bao gồm các câu lệnh SQL và truy vấn liên quan của chúng và kết quả. Nói chung, khi sử dụng database driver interface, phần lớn tương tác với interface sẽ sử dụng SQL để giao tiếp với cơ sở dữ liệu và các driver calls để gửi dữ liệu và truy vấn, đồng thời truy xuất các tập kết quả truy vấn từ cơ sở dữ liệu.

## ORMs vs Drivers

## Schema

Mongoose ‘schema’ là một cấu trúc dữ liệu tài liệu (hoặc shapeg của tài liệu) được thực thi thông qua application layer.

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

### Schema Type

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
* ObjectId: là type đặc biệt, thường được sử dụng cho identiters duy nhất.

```php
const carSchema = new mongoose.Schema({ driver: mongoose.ObjectId });
```

Object là 1 class và Objects là Objects. Nhưng thường thể hiện dạng chuỗi, để convert ObjectId to String sử dụng toString()

Một ObjectId là một kiểu BSON (12 byte) có cấu trúc như sau:

* 4 byte đầu tiên biểu diễn số giây từ UNIX Epoch.
* A 3 byte tiếp theo là id của máy.
* A 2 byte kế tiếp là process id.
* Và 3 byte cuối cùng là một giá trị đếm ngẫu nhiên.

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

Các hoạt động CRUD (Create, Read, Update, Delete) cho phép bạn làm việc với dữ liệu được lưu trữ trong MongoDB.

Tài liệu hoạt động CRUD được phân loại thành hai phần:

* Read Operations tìm và trả lại các documents được lưu trữ trong cơ sở dữ liệu MongoDB của bạn.
* Write Operations chèn, sửa đổi hoặc xóa documents trong cơ sở dữ liệu MongoDB của bạn.

### 1. Create

### **insertOne(doc, options, callback)**

Chèn một document duy nhất vào MongoDB. Nếu documents được chuyển vào không chứa trường _id, một trường_id sẽ được thêm vào mỗi document bị missing by driver, làm thay đổi document. Hành vi này
có thể được ghi đè bằng cách đặt forceServerObjectId flag.

```php
insertMany(docs, options, callback)
- docs - object | Array.<object> - Documents to insert.
- options - object optionalOptional - settings.

async function createListing(client, newListing){
  const result = await client.db("sample_airbnb").collection("listingsAndReviews").insertOne(newListing);
}

await createListing(client,
      {
          name: "Lovely Loft",
          summary: "A charming loft in Paris",
          bedrooms: 1,
          bathrooms: 1
      }
  );
```

Kết quả trả về:

```php
New listing created with the following id: 636a04406ad4beff06460f55
```

### **insertMany(docs, options, callback)**

Chèn một array document vào MongoDB.

```php
insertMany(docs, options, callback)
- docs - object | Array.<object> - Documents to insert.
- options - object optionalOptional - settings.

async function createMultipleListings(client, newListings){
  const result = await client.db("sample_airbnb").collection("listingsAndReviews").insertMany(newListings);
}

await createMultipleListings(client, [
    {
        name: "Infinite Views",
        summary: "Modern home with infinite views from the infinity pool",
        property_type: "House",
        bedrooms: 5,
        bathrooms: 4.5,
        beds: 5
    },
    {
        name: "Private room in London",
        property_type: "Apartment",
        bedrooms: 1,
        bathroom: 1
    },
    {
        name: "Beautiful Beach House",
        summary: "Enjoy relaxed beach living in this house with a private beach",
        bedrooms: 4,
        bathrooms: 2.5,
        beds: 7,
        last_review: new Date()
    }
]);
```

Kết quả trả về:

```php
3 new listing(s) created with the following id(s):
{
  '0': new ObjectId("636a03b2c8d6aadc922bbdd1"),
  '1': new ObjectId("636a03b2c8d6aadc922bbdd2"),
  '2': new ObjectId("636a03b2c8d6aadc922bbdd3")
}
```

### 2. Read

### **findOne(query, options, callback)**

Tìm nạp tài liệu document phù hợp với truy vấn

```php
findOne(query, options, callback)
- query - object - Query for find Operation
- options - object - Optional settings.

async function findOneListingByName(client, nameOfListing) {
  const result = await client.db("sample_airbnb").collection("listingsAndReviews").findOne({ name: nameOfListing });

  if(result) {
    console.log(`Found a listing in the collection with the name '${ nameOfListing }'` );
    console.log(result);
  } else {
    console.log(`No listings found with the name '${ nameOfListing }'`);
  }

// Exec
  await findOneListingByName(client, "Infinite Views");
}
```

Kết quả trả về:

```php
Found a listing in the collection with the name 'Infinite Views'
{
  _id: new ObjectId("6369dff18927a92f8fdc34dc"),
  name: 'Infinite Views',
  summary: 'Modern home with infinite views from the infinity pool',
  property_type: 'House',
  bedrooms: 5,
  bathrooms: 4.5,
  beds: 5
}
```

### **find(query, options)**

Tạo cursor cho một truy vấn có thể được sử dụng để lặp lại các kết quả từ MongoDB

```php
async function findListingsWithMinimumBedroomsBathroomsAndMostRecentReviews(client, {
    minimumNumberOfBedrooms = 0,
    minimumNumberOfBathrooms = 0,
    maximumNumberOfResults = Number.MAX_SAFE_INTEGER
} = {}) {

    // See https://mongodb.github.io/node-mongodb-native/3.6/api/Collection.html#find for the find() docs
    const cursor = client.db("sample_airbnb").collection("listingsAndReviews")
        .find({
            bedrooms: { $gte: minimumNumberOfBedrooms },
            bathrooms: { $gte: minimumNumberOfBathrooms }
        }
        )
        .sort({ last_review: -1 })
        .limit(maximumNumberOfResults);

    // Store the results in an array
    const results = await cursor.toArray();

    // Print the results
    if (results.length > 0) {
        console.log(`Found listing(s) with at least ${minimumNumberOfBedrooms} bedrooms and ${minimumNumberOfBathrooms} bathrooms:`);
        results.forEach((result, i) => {
            const date = new Date(result.last_review).toDateString();

            console.log();
            console.log(`${i + 1}. name: ${result.name}`);
            console.log(`   _id: ${result._id}`);
            console.log(`   bedrooms: ${result.bedrooms}`);
            console.log(`   bathrooms: ${result.bathrooms}`);
            console.log(`   most recent review date: ${date}`);
        });
    } else {
        console.log(`No listings found with at least ${minimumNumberOfBedrooms} bedrooms and ${minimumNumberOfBathrooms} bathrooms`);
    }
}

// Exec
await findListingsWithMinimumBedroomsBathroomsAndMostRecentReviews(client, {
            minimumNumberOfBedrooms: 4,
            minimumNumberOfBathrooms: 2,
            maximumNumberOfResults: 5
        }); 
```

Kết quả trả về:

```php
Found listing(s) with at least 4 bedrooms and 2 bathrooms:

1. name: Beautiful Beach House
   _id: 636a03b2c8d6aadc922bbdd3
   bedrooms: 4
   bathrooms: 2.5
   most recent review date: Tue Nov 08 2022

2. name: Beautiful Beach House
   _id: 6369fb9cab32f0b252a1f262
   bedrooms: 4
   bathrooms: 2.5
   most recent review date: Tue Nov 08 2022

3. name: Beautiful Beach House
   _id: 6369faf82bfd758178b54d0f
   bedrooms: 4
   bathrooms: 2.5
   most recent review date: Tue Nov 08 2022

4. name: Beautiful Beach House
   _id: 6369dff18927a92f8fdc34de
   bedrooms: 4
   bathrooms: 2.5
   most recent review date: Tue Nov 08 2022

5. name: Spectacular Modern Uptown Duplex
   _id: 582364
   bedrooms: 4
   bathrooms: 2.5
   most recent review date: Wed Mar 06 2019
```

### **3. Update**

### updateOne(filter, update, options, callback)

Cập nhật một document duy nhất trong một collection

| Name | Type | Description|
|---|---|---|
| filter | Object | Filter được sử dụng để chọn document để cập nhật | |
| update |  Object  | Các thao tác cập nhật được áp dụng cho document | |
| options | Object | Cài đặt tùy chọn. | |

|  |  | Name | Type | Defaul | Description |
|---|---|---|---|---|---|
|  |  | arrayFilters | Array | | Danh sách tùy chọn của Array filter được tham chiếu trong các toán tử vị trí đã lọc
|  |  | bypassDocumentValidation | boolean | false | Cho phép driver bỏ qua xác thực schema trong MongoDB 3.2 trở lên.
|  |  | upsert() | MongoError |  | Bổ trợ nâng cấp cho thao tác cập nhật hàng loạt, lưu ý rằng thao tác này là một nâng cấp.

```php
async function updateListingByName(client, nameOfListing, updateListing) {
  const result = await client.db("sample_airbnb").collection("listingsAndReviews").updateOne({ name: nameOfListing }, { $set: updateListing });

  console.log(`${result.matchedCount} document (s) matched the query criteria`);
  console.log(`${result.modifiedCount} document was/were updated`);
}

// Execute
updateListingByName(client, "Infinite Views", {bedrooms: 6, beds: 8});
```

Kết quả trả về:

```php
1 document (s) matched the query criteria
0 document was/were updated
```

### updateMany(filter, update, options, callback)

Cập nhật nhieeuf document trong một collection

| Name | Type | Description|
|---|---|---|
| filter | Object | Filter được sử dụng để chọn document để cập nhật | |
| update |  Object  | Các thao tác cập nhật được áp dụng cho document | |
| options | Object | Cài đặt tùy chọn. | |

|  |  | Name | Type | Defaul | Description |
|---|---|---|---|---|---|
|  |  | arrayFilters | Array | | Danh sách tùy chọn của Array filter được tham chiếu trong các toán tử vị trí đã lọc
|  |  | bypassDocumentValidation | boolean | false | Cho phép driver bỏ qua xác thực schema trong MongoDB 3.2 trở lên.
|  |  | upsert | MongoError |  | Bổ trợ nâng cấp cho thao tác cập nhật hàng loạt, lưu ý rằng thao tác này là một nâng cấp.

```php
const result = await client.db("sample_airbnb").collection("listingsAndReviews").updateMany({ property_type: { $exists: false } }, { $set: { property_type: "Unknown" } });

  console.log(`${result.matchedCount} document(s) matched the query criteria`);
  console.log(`${result.modifiedCount} document(s) was/were updated `);

  // Execute
  await updateAllListingsToHaveProperty(client);
```

Kết quả trả về:

```php
7 document(s) matched the query criteria
7 document(s) was/were updated 
```

### 4. Delete

### **DeleteOne**

Thêm một thao tác xóa một thao tác vào hoạt động hàng loạt

```php
async function deleteListingByName(client, nameOfListing) {
  const result = await client.db("sample_airbnb").collection("listingsAndReviews").deleteOne({ name: nameOfListing });
  console.log(`${result.deletedCount} document(s) was/were deleted.`);
}

// Execute
await deleteListingByName(client, "Infinite Views");
```

Kết quả trả về:

```php
1 document(s) was/were deleted.
```

### **deleteMany(filter, options, callback)**

xóa nhieu document vào collection

| Name | Type | Description|
|---|---|---|
| filter | Object | Filter được sử dụng để chọn document để xoa |
| options | Object | Cài đặt tùy chọn. |

```php
async function deleteListingsScrapedBeforeDate(client, date) {
  const result = await client.db("sample_airbnb").collection("listingsAndReviews").deleteMany({ "last_scraped": {$lt: date} });
  console.log(`${result.deletedCount} document(s) was/were deleted.`);
}

// Execute
await deleteListingsScrapedBeforeDate(client, new Date("2019-02-15"));
```

Kết quả trả về:

```php
606 document(s) was/were deleted.
```

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

MongoDB là một cơ sở dữ liệu mã nguồn mở và là cơ sở dữ liệu NoSQL
NoSQL là một thuật ngữ chung chung được sử dụng để mô tả bất kỳ kho dữ liệu nào không sử dụng cách tiếp cận kế thừa của các bảng dữ liệu liên quan.
Lưu trữ dữ liệu của mình một cách có tổ chức, nhưng không lưu trữ các hàng và cột.
Dữ liệu trong MongoDB được lưu trữ dưới dạng document. Những dữ liệu được lưu trong colletions

### **So sánh RDBMS và MongoDB**

| No. | Key | SQL | NoSQL|
| --- | --- |---|---|
| 1 | Concept | RDBMS là một hệ quản trị cơ sở dữ liệu quan hệ và hoạt động trên cơ sở dữ liệu quan hệ. | MongoDB là một hệ quản trị cơ sở dữ liệu hướng tài liệu, phi quan hệ và hoạt động trên cơ sở dữ liệu dựa trên tài liệu. |
| 2 | Hiearchical | Khó lưu trữ dữ liệu phân cấp. | Có hỗ trợ sẵn có để lưu trữ dữ liệu thứ cấp. |
| 3 | Scalablity | RDBMS có thể mở rộng theo chiều dọc. Hiệu suất tăng khi tăng RAM. | MongoDB cũng có thể mở rộng theo chiều ngang. Hiệu suất của nó tăng lên khi bổ sung bộ xử lý. |
| 4 | Schema | Schema cần được xác định trong RDBMS trước khi sử dụng cơ sở dữ liệu. | Schema có thể được tạo và truy cập động trong MongoDB. |
| 5 | SQL Injection(1) | Dễ bị tổn thương SQL Injection attack | Không thể SQL Injection. |
| 6 | Principle | Tuân theo nguyên tắc ACID, Atomicity, Consistency, Isolation, and Durability. | Tuân theo định lý CAP, tính nhất quán, tính khả dụng và dung sai phân vùng. |
| 7 | Basis | Database sử dụng Row| Databse sử dụng Document |
| 8 | Basis | Database sử dụng Column| Database sử dụng Field |
| 9 | Performance | RDBMS chậm hơn trong việc xử lý dữ liệu lớn. | MongoDB rất nhanh trong việc xử lý dữ liệu phân cấp lớn. |
| 10 | Joins | RDBMS hỗ trợ các phép nối phức tạp. | MongoDB không hỗ trợ cho các phép nối phức tạp. |
| 11 | JavaScript Client | RDBMS không cung cấp Javascript based client để truy vấn cơ sở dữ liệu. | MongoDB cung cấp Javascript based client để truy vấn cơ sở dữ liệu. |
| 12 | Query Language | RDBMS uses SQL to query database. | MongoDB uses BSON to query database.|

1. SQL Injection là một kỹ thuật lợi dụng những lỗ hổng về câu truy vấn của các ứng dụng. Được thực hiện bằng cách chèn thêm một đoạn SQL để làm sai lệnh đi câu truy vấn ban đầu, từ đó có thể khai thác dữ liệu từ database. SQL injection có thể cho phép những kẻ tấn công thực hiện các thao tác như một người quản trị web, trên cơ sở dữ liệu của ứng dụng.

### **So sánh SQL và NoSQL**

| SQL | NoSQL|
|---|---|
| Hệ quản trị cơ sỡ dữ liệu quan hệ RDBMS (Relational Database Management System)  | Hệ quản trị cơ sơ dữ liệu phân tàn hoặc không ràng buộc |
| Schema cố định hoặc tĩnh hoặc được xác định trước (1) | Schema động (2) |
| Không phù hợp để lưu trữ dữ liệu phân cấp(3). | Phù hợp để lưu trữ dữ liệu phân cấp |
| Phù hợp nhất cho các query phức tạp | Không tốt cho các query phức tạp |
| Có thể mở rộng theo chiều dọc | Có thể mở rộng theo chiều ngang |
| Tuân theo thuộc tính ACID | Tuân theo CAP (tính nhất quán, tính khả dụng, dung sai phân vùng) |
| MySQL, PostgreSQL, Oracle, MS-SQL Server | MongoDB, GraphQL, HBase, Neo4j, Cassandra etc |
Note:

1. Shema tĩnh: mỗi column trong table phải được định nghĩa từ trước khi tạo bảng, và mỗi khi dữ liệu được thêm vào một row thì các column của nó phải có giá trị (chấp nhận giá trị NULL). Các schema có thể được thay đổi sau đó (alter table), nhưng sự thay đổi này phải nằm ở phía Database và khi DB thực hiện thay đổi này nó sẽ offline tạm thời.
2. Schema là động (dynamic) có nghĩa là ta không cần phải định nghĩa một schema nào trước mà schema sẽ được dựa vào cấu trúc của records được đưa vào.
3. Mô hình cơ sở dữ liệu phân cấp (tiếng Anh: hierarchical database model) là một loại mô hình dữ liệu, trong đó dữ liệu được tổ chức thành cấu trúc dạng cây. Dữ liệu được lưu trữ dưới dạng các bản ghi (record) kết nối với nhau thông qua các liên kết (link). Mỗi bản ghi là một tập hợp các trường (field), mỗi trường chỉ chứa một giá trị. Kiểu (type) của một bản ghi xác định bản ghi đó sẽ chứa những trường nào.
   * Ưu điểm:
     * Dễ sử dụng. Việc tổ chức dữ liệu một-nhiều làm cho việc duyệt cơ sở dữ liệu trở nên đơn giản và nhanh chóng, lý tưởng cho các trường hợp sử dụng như menu thả xuống của trang web hoặc thư mục máy tính trong các hệ thống như Microsoft Windows OS.
     * Do sự tách biệt của các bảng khỏi cấu trúc lưu trữ vật lý, thông tin có thể dễ dàng được thêm vào hoặc xóa mà không ảnh hưởng đến toàn bộ cơ sở dữ liệu.
     * Và hầu hết các ngôn ngữ lập trình chính đều cung cấp chức năng đọc cơ sở dữ liệu cấu trúc cây.
   * Nhược điểm
     * Bản chất không linh hoạt. Cấu trúc một-nhiều không lý tưởng cho các cấu trúc phức tạp vì nó không thể mô tả các mối quan hệ trong đó mỗi nút con có nhiều nút cha.
     * Ngoài ra, tổ chức dữ liệu dạng cây yêu cầu tìm kiếm tuần tự từ trên xuống dưới, việc này tốn thời gian và yêu cầu lưu trữ lặp đi lặp lại dữ liệu trong nhiều thực thể khác nhau, điều này có thể là dư thừa.
4. ACID (viết tắt của Atomicity, Consistency, Isolation, Durability) là một khái niệm cơ sở dữ liệu mà các chuyên gia thường tìm kiếm khi đánh giá các cơ sở dữ liệu và kiến trúc ứng dụng. Đối với một cơ sở dữ liệu đáng tin cậy tất cả bốn thuộc tính cần đạt được.
   1. Atomicity là một đề xuất tất cả hoặc không có gì. Tính chất này đảm bảo rằng khi một giao dịch liên quan đến hai hay nhiều xử lý, hoặc là tất cả các xử lý được thực hiện hoặc không có xử lý được thực hiện.
   2. Consistency đảm bảo rằng một giao dịch không bao giờ được thông qua cơ sở dữ liệu của bạn trong tình trạng dở dang. Tính chất này, hoặc là tạo ra toàn bộ trạng thái mới hoặc rollback tất cả các xử lý để về trạng thái ban đầu, nhưng không bao giờ thông qua cơ sở dữ liệu trong trạng thái dở dang.
   3. Isolation giữ giao dịch tách rời nhau cho đến khi chúng đã hoàn tất. Tính chất này đảm bảo rằng hai hoặc nhiều giao dịch không bao giờ được trộn lẫn với nhau, tạo ra dữ liệu không chính xác và không phù hợp.
   4. Durability đảm bảo rằng cơ sở dữ liệu sẽ theo dõi các thay đổi cấp phát trong một cách mà các máy chủ có thể phục hồi từ một sự kết thúc bất thường. Tính chất này đảm bảo rằng trong trường hợp thất bại hay dịch vụ khởi động lại các dữ liệu có sẵn trong  trước khi gặp lỗi.
5. CAP: một hệ thống phân tán chỉ có thể có được hai trong ba đặc tính mong muốn: Tính nhất quán (Consistency), tính khả dụng (Availibility) và dung sai phân vùng (Partition tolerance).
   1. Tính nhất quán: có nghĩa là tại cùng một thời điểm, dữ liệu mà tất cả các máy khách nhìn thấy phải là giống nhau, bất kể nó kết nối với node nào. Để điều này xảy ra, bất cứ khi nào dữ liệu được ghi vào một node, nó phải được chuyển tiếp hoặc sao chép ngay lập tức tới tất cả các node khác trong hệ thống trước khi việc ghi được coi là "thành công".
   2. Tính khả dụng: có nghĩa là bất kỳ máy khách nào đưa ra yêu cầu dữ liệu đều nhận được phản hồi, ngay cả khi một hoặc nhiều node bị ngừng hoạt động. Hay nói cách khác — đối với bất kỳ yêu cầu nào, tất cả các node đang hoạt động trong hệ thống phân tán phải trả về phản hồi hợp lệ.
   3. Dung sai phân vùng: Phân vùng là sự đứt gãy liên lạc trong hệ thống phân tán, hay cụ thể hơn, là việc kết nối giữa hai node bị mất hoặc tạm thời bị trì hoãn. Dung sai phân vùng có nghĩa là cluster phải duy trì được trạng thái hoạt động dù cho có bất kỳ sự cố giao tiếp nào giữa các node trong hệ thống.
   4. MongoDB là một kho lưu trữ dữ liệu CP — nó giải quyết các phân vùng mạng bằng cách duy trì tính nhất quán, nhưng không đảm bảo tính khả dụng.

## Index

Trong MongoDB index hỗ trợ thực hiện các câu truy vấn hiệu quả hơn. Nếu không có index, MongoDB sẽ phải duyệt tất cả các document trong một collection để tìm ra những document thoả mãn với điều kiện truy vấn. Nếu có một index tồn tại, MongoDB có thể sử dụng nó để giới hạn số lượng document mà nó phải kiểm tra.

Indexs là một cấu trúc đặc biết lưu trữ một phần nhỏ của collection, nó sẽ lưu giá trị của một field hoặc một tập các field được đánh index và sắp xếp chúng theo giá trị của field.

### Các loại index trong MongoDB

MongoDB cung cấp một số loại index khác nhau để hỗ trợ cho các kiểu dữ liệu và câu truy vấn khác nhau.

### **Single Field**

Index trên một field duy nhất. Mặc định MongoDB lập single field index trên _id.

Thứ tự sắp xếp index trong single field là không quan trọng vì mongodb có thể đi từ 2 hướng đầu đến cuối và ngược lại.

### **Compound index**

MongoDB cũng hỗ trợ đánh index trên nhiều field. Lưu ý thứ tự của các field được đánh index điều có ý nghĩa. Ví dụ như compound index {name: 1, userid: -1}, đầu tiên MongoDB sẽ sắp sắp index theo name, sau đó với các name có cùng giá trị tiến hành sắp xếp theo userid.

### **Tạo index trong mongoose**

```php
  var animalSchema = new Schema({
    name: String,
    type: String,
    tags: { type: [String], index: true } // field level
  });

  animalSchema.index({ name: 1, type: -1 }); // index() method
```

## Aggregation

Aggregation framework là một truy vấn nâng cao của MongoDb, cho phép thực hiện tính toán , xử lý và kết hợp từ nhiều document(tương tự các bảng trong SQL) để cho ra thông tin cần thiết.

Khi thực hiện theo tác với Aggregation framework , về nguyên tắc Aggregation sẽ thực hiện xử lý dựa theo các aggregation pipeline. Mỗi step thực hiện một tính toán duy nhất trong các dữ liệu đầu vào và tạo dữ liệu đầu ra.

Cú pháp cơ bản của phương thức aggregate()

```php
>db.COLLECTION_NAME.aggregate(AGGREGATE_OPERATION)
```

Một số Operation cơ bản trong Aggregation :

* $project : chỉ định các field mong muốn truy vấn.

Cú pháp:

```php
{ $project: { <specification(s)> } }

Ex:
db.Customer.aggregate( [ { $project : { address : 1 , city : 1 , state: 1 } } ] )
```

| Form | Description |
| ------------ | ---- |
| field: <1 or true> | Chỉ định bao gồm 1 trường, tất cả integer khác không => true |
| _id: <0 or false> | Chỉ định việc loại bỏ trường _id. Để loại trừ một trường có điều kiện, hãy sử dụng biến $$Remove thay thế |
| field: expression | Thêm trường mới hoặc đặt lại giá trị của trường hiện có. Nếu biểu thức đánh giá là $$ REMOVE, trường sẽ bị loại trừ trong đầu ra. |
| < field > :<0 or false> | Chỉ định loại trừ một trường. Để loại trừ một trường có điều kiện, hãy sử dụng biến $$ REMOVE thay thế. Nếu bạn chỉ định loại trừ trường không phải _id, bạn không thể sử dụng bất kỳ trường nào khác $project specification forms. |

* $match : chọn document mong muốn truy vấn.

Cú pháp:

```php
{ $match: { <query> } }

Ex:
db.Customer.aggregate(
    [ { $match : { city : "Salem" } } ]
);
```

* **$limit**: giới hạn số lượng document

Cú pháp:

```php
db.Customer.aggregate([
    { $limit : 2 }
]);

* $skip : bỏ qua document nhất định
* $group: nhóm các document theo điều kiện nhất định

Cú pháp:

```php
{
  $group:
    {
      _id: <expression>, // Group By Expression
      <field1>: { <accumulator1> : <expression1> },
      ...
    }
 }

Ex:
db.Customer.aggregate([
  {
    $group : {
       _id : "$state",
       count: { $sum: 1 }
    }
  }
 ])
```

* **$sort**: sắp xếp document

Cú pháp:

```php
{ $sort: { <field1>: <sort order>, <field2>: <sort order> ... }}

Ex:
db.Customer.aggregate(
   [
     { $sort : { postal_code : 1, fed_id: -1 } },
     { $limit: 2 }
   ]
)
```

* $unwind : thực hiện thao tác mở rộng trên một mảng , tạo một ouput document cho mỗi giá trị trong mảng đó
* $out : ghi kết quả sau khi thực hiện trên pipeline vào một collection. (chỉ áp dụng đối với version 2.6 trở đi)

Bảng so sánh giữa SQL và aggregation framework :
| SQL Command | Aggregation framework operator|
|---|---|
| Select | $project $group function: $sum, $min, $avg,...|
| From | db.collection.aggregate(...) |
| Join | $unwind |
| GroupBy | $group |
| Having | $macth |
