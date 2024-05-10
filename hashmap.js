class NodeBucket {
    constructor(key, value) {
        this.key = key;
        this.value = value;
        this.nextNode = null;
    }
}


class HashMap {
    constructor() {
        this.buckets = new Array(16).fill(null);
        this.capacity = 0;
        this.loadFactor = 0.75;
    }



    hash(key) {
        let  hashCode = 0;

        const primeNumber = 31;
        for (let i = 0; i < key.length; i++) {
            hashCode = primeNumber * hashCode + key.charCodeAt(i);
        }

        return hashCode;
    }

    set(key, value) {
        const hashKey = this.hash(key) % this.buckets.length;
        if (!this.buckets[hashKey]) {
            this.buckets[hashKey] = new NodeBucket(key, value);
        } else {
            function travelToLastNode(node) { // recursive function from linked list project
                if (node.nextNode === null || node.key === key) {
                    if (node.key !== key) {
                        node.nextNode = new NodeBucket(key, value);
                        return;
                    } else {
                        node.value = value;
                        return;
                    }
                }
                travelToLastNode(node.nextNode);
            }
            travelToLastNode(this.buckets[hashKey]);
        }
        this.capacity = this.length();
        if (this.capacity / this.buckets.length >= this.loadFactor) {
            let oldBuckets = this.entries();
            this.buckets = new Array(this.buckets.length * 2).fill(null);
            oldBuckets.forEach((bucket) => {
                this.set(bucket[0], bucket[1]);
            })
        }

        
    }

    get(key) {
        const hashKey = this.hash(key) % this.buckets.length;
        let currentNode = this.buckets[hashKey];
        while (currentNode && currentNode.key !== key) {
            currentNode = currentNode.nextNode;
        }
        return currentNode ? currentNode.value : null;
    }

    has(key) {
        const hashKey = this.hash(key) % this.buckets.length;
        let currentNode = this.buckets[hashKey];
        while (currentNode && currentNode.key !== key) {
            currentNode = currentNode.nextNode;
        }
        return currentNode && currentNode.key === key ? true : false;
        
    }

    remove(key) {
        const hashKey = this.hash(key) % this.buckets.length;
        if (this.buckets[hashKey]) {
            let currentNode = this.buckets[hashKey];
            if (currentNode.key === key) {
                this.buckets[hashKey] = currentNode.nextNode;
            } else {
                while (currentNode.nextNode && currentNode.nextNode.key !== key) {
                    currentNode = currentNode.nextNode;
                }
                currentNode.nextNode = currentNode.nextNode.nextNode;
            }
            this.capacity--;
            return true;
        } else {
            return false;
        }
    }

    length() {
        let counter = 0;
        this.buckets.forEach((bucket) => {
                while (bucket) {
                    counter++;
                    bucket = bucket.nextNode;
                }
        });
        return counter;
    }

    clear() {
        this.buckets = new Array(this.buckets.length).fill(null);
        this.capacity = 0;
    }

    keys() {
        let keys = [];
        this.buckets.forEach((bucket) => {
            let currentNode = bucket;
            while (currentNode) {
                keys.push(currentNode.key);
                currentNode = currentNode.nextNode;
            }
        });
        return keys;
    }

    values() {
        let values = [];
        this.buckets.forEach(bucket => {
            while (bucket) {
                values.push(bucket.value);
                bucket = bucket.nextNode;
            }
        });
        return values;
    }

    entries() {
        let pairs = [];
        this.buckets.forEach((bucket) => {
            while (bucket) {
                pairs.push([bucket.key, bucket.value]);
                bucket = bucket.nextNode;
            }
        });
        return pairs;
    }
}

let hashmap = new HashMap();
hashmap.set("Fred", "Smith"); // collision with John Smith
hashmap.set("Karl", "Franz");
hashmap.set("Elspeth", "Von Draken");
hashmap.set("Balthasar", "Gelt");
hashmap.set("John", "Smith");
hashmap.set("Ikit", "Claw");
hashmap.set("Corvus", "Corax");
hashmap.set("Gregor", "Eisenhorn"); // collision with Karl Franz
hashmap.set("Garviel", "Loken");
hashmap.set("Ferrus", "Manus"); // collision with Ikit Claw
hashmap.set("The", "Emperor");

