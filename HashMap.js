class DataItem {
  constructor(key, value) {
    this.key = key;
    this.value = value;
  }

  get key() {
    return this._key;
  }

  set key(key) {
    this._key = key;
  }

  get value() {
    return this._value;
  }

  set value(value) {
    this._value = value;
  }
}

class HashMap {
  constructor() {
    this._hashArray = new Array(this._hashMapSize);
  }

  _hashMapSize = 64;
  _loadFactor = 0;
  _filledPositionCount = 0;

  _checkHashMapGrowth() {
    this._loadFactor = Math.floor(
      this._filledPositionCount / this._hashMapSize
    );
    if (this._loadFactor > 0.75) {
      const newHashArray = new Array(this._hashMapSize * 1.5);
      var i;
      for (i = 0; i < this._hashMapSize; ++i) {
        if (this._hashArray[i]) {
          newHashArray[i] = this._hashArray[i];
        }
      }
      this._hashArray = newHashArray;
      this._hashMapSize = this._hashMapSize * 1.5;
      this._loadFactor = Math.floor(
        this._filledPositionCount / this._hashMapSize
      );
    }
  }

  hash(key) {
    const keyString = String(key);
    let sum = 0;
    const strLen = keyString.length;
    const primeNumber = 17;
    var i;
    for (i = 0; i < strLen; ++i) {
      sum = primeNumber * sum + keyString.charCodeAt(i);
    }
    const hashCode = sum % this._hashMapSize;
    return hashCode;
  }

  set(key, value) {
    const hashCode = this.hash(key);
    if (this._hashArray[hashCode]) {
      console.log(
        `overwritten value of key "${key}" to key "${this._hashArray[hashCode].key}"`
      );
      this._hashArray[hashCode].value = value;
    } else {
      const dataItem = new DataItem(key, value);
      this._hashArray[hashCode] = dataItem;
      this._filledPositionCount += 1;
      this._checkHashMapGrowth();
    }
  }

  get(key) {
    const hashCode = this.hash(key);
    if (this._hashArray[hashCode] && this._hashArray[hashCode].key === key) {
      return this._hashArray[hashCode].value;
    } else {
      return null;
    }
  }

  has(key) {
    const hashCode = this.hash(key);
    if (this._hashArray[hashCode] && this._hashArray[hashCode].key === key) {
      return true;
    } else {
      return false;
    }
  }

  remove(key) {
    const hashCode = this.hash(key);
    if (this._hashArray[hashCode] && this._hashArray[hashCode].key === key) {
      this._hashArray[hashCode] = undefined;
      this._filledPositionCount -= 1;
      return true;
    } else {
      return false;
    }
  }

  length() {
    return this._filledPositionCount;
  }

  clear() {
    this._hashArray.forEach((item) => {
      item = undefined;
    });
    this._loadFactor = 0;
    this._filledPositionCount = 0;
  }

  keys() {
    if (this._filledPositionCount === 0) {
      return [];
    }
    let keysArr = [];
    this._hashArray.forEach((item) => {
      if (item) {
        keysArr = keysArr.concat([item.key]);
      }
    });
    return keysArr;
  }

  values() {
    if (this._filledPositionCount === 0) {
      return [];
    }
    let values = [];
    this._hashArray.forEach((item) => {
      if (item) {
        values = values.concat([item.value]);
      }
    });
    return values;
  }

  entries() {
    if (this._filledPositionCount === 0) {
      return [];
    }
    let entries = [];
    this._hashArray.forEach((item) => {
      if (item) {
        entries = entries.concat([[item.key, item.value]]);
      }
    });
    return entries;
  }
}

class HashSet extends HashMap {
  constructor() {
    super();
  }

  set(key) {
    const hashCode = this.hash(key);
    if (!this._hashArray[hashCode]) {
      const dataItem = new DataItem(key, key);
      this._hashArray[hashCode] = dataItem;
      this._filledPositionCount += 1;
      this._checkHashMapGrowth();
    }
  }

  entries() {
    if (this._filledPositionCount === 0) {
      return [];
    }
    let entries = [];
    this._hashArray.forEach((item) => {
      if (item) {
        entries = entries.concat([item.key]);
      }
    });
    return entries;
  }
}

let testResults = new HashMap();
testResults.set("Andrew", "A+");
testResults.set("July", "C");
testResults.set("Nick", "B-");
testResults.set("Trevor", "D");
testResults.set("Sasha", "A-");

console.log(testResults.keys());
console.log(testResults.values());
console.log(testResults.entries());

console.log("get Mahito: ", testResults.get("Mahito"));
console.log("has shaha", testResults.has("shaha"));
console.log("has Trevor", testResults.has("Trevor"));
console.log("remove July", testResults.remove("July"));

console.log(testResults.entries());
console.log(testResults.length());
testResults.clear();
console.log("clear");
console.log(testResults.entries());

let set = new HashSet();
set.set("mecury");
set.set("venus");
set.set("moom");
set.set("mar");
set.set("jupitor");
set.set("uranus");
console.log(set.keys());
set.remove("uranus");
console.log(set.entries());
