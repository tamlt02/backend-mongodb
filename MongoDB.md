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

## Aggregation
