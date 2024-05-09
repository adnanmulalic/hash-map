# hash-map
HashMap practice from TOP

Start by creating a HashMap class or factory function. It’s up to you which you want to use. Then proceed to create the following methods:

    hash(key) takes a key and produces a hash code with it. We did implement a fairly good hash function in the previous lesson. As a reminder:

     function hash(key) {
       let hashCode = 0;
          
       const primeNumber = 31;
       for (let i = 0; i < key.length; i++) {
         hashCode = primeNumber * hashCode + key.charCodeAt(i);
       }

       return hashCode;
     } 

    You are free to use that, or if you wish, you can conduct your own research. Beware, this is a deep deep rabbit hole.

    Also, there is one edge case with long keys that was not taken into consideration in the function or rather how we applied a modulo % operator. JavaScript is unable to hold large numbers precisely. At some point, calculations are going to be inaccurate, which significantly increases the chances of collisions. There are a few ways how we could handle it but we recommend that you apply the modulo operator on each iteration instead of outside the loop at the end. In that case, we prevent the output from becoming larger than our bucket’s length.

    You might find yourself confusing keys with hash codes while accessing key-value pairs later. We would like to stress that the key is what your hash function will take as an input. In a way, we could say that the key is important for us only inside the hash function. But we never access a bucket directly with the key. Instead we do so with the hash code.

    Hash maps could accommodate various data types for keys like numbers, strings, objects. But for this project, only handle keys of type strings.

    set(key, value) takes two arguments, the first is a key and the second is a value that is assigned to this key. If a key already exists, then the old value is overwritten or we can say that we update the key’s value (e.g. Carlos is our key but it is called twice: once with value I am the old value., and once with value I am the new value.. From the logic stated above, Carlos should contain only the latter value).

    In the meantime, a collision is when TWO DIFFERENT keys sit inside the same bucket, because they generate the same hash code (e.g. Carlos and Carla are both hashed to 3, so 3 becomes a location for Carlos AND Carla. However, we know that it is the collision. It means we should find a way how to resolve it — how to deal with collisions, which was mentioned in the previous lesson).
        Remember to grow your buckets size when it needs to, by calculating if your bucket has reached the load factor. Some of the methods in this assignment that are mentioned later could be reused to help you handle that growth logic more easily. So you may want to hold onto implementing your growing functionality just for now. However, the reason why we mention it with set() is because it’s important to grow buckets exactly when they are being expanded.

    get(key) takes one argument as a key and returns the value that is assigned to this key. If a key is not found, return null.

    has(key) takes a key as an argument and returns true or false based on whether or not the key is in the hash map.

    remove(key) takes a key as an argument. If the given key is in the hash map, it should remove the entry with that key and return true. If the key isn’t in the hash map, it should return false.

    length() returns the number of stored keys in the hash map.

    clear() removes all entries in the hash map.

    keys() returns an array containing all the keys inside the hash map.

    values() returns an array containing all the values.

    entries() returns an array that contains each key, value pair. Example: [[firstKey, firstValue], [secondKey, secondValue]]

Remember that a hash map does not preserve insertion order when you are retrieving your hash map’s data. It is normal and expected for keys and values to appear out of the order you inserted them in.
Extra Credit

    Create a class HashSet that behaves the same as a HashMap but only contains keys with no values.

