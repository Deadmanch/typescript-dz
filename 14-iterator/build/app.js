"use strict";
const boardGameCollection = [
    {
        id: 1,
        dateOfPurchase: '2023-01-10',
        title: 'Dune: Imperium',
        designer: 'Paul Dennen',
        ratingBGG: 8.4,
    },
    {
        id: 2,
        dateOfPurchase: '2022-03-10',
        title: 'Star Wars: Rebellion ',
        designer: 'Corey Konieczka',
        ratingBGG: 8.4,
    },
    {
        id: 3,
        dateOfPurchase: '2023-04-05',
        title: 'War of the Ring: Second Edition ',
        designer: 'Roberto Di Meglio, Marco Maggi, Francesco Nepitello',
        ratingBGG: 8.5,
    },
    {
        id: 4,
        dateOfPurchase: '2024-02-12',
        title: 'Grand Austria Hotel',
        designer: 'Virginio Gigli, Simone Luciani',
        ratingBGG: 7.9,
    },
];
class BoardGameCollection {
    constructor(boardGames) {
        this.boardGames = [];
        this.boardGames = boardGames;
    }
    sort(sortValue) {
        this.boardGames = this.boardGames.sort((a, b) => a[sortValue] > b[sortValue] ? 1 : a[sortValue] === b[sortValue] ? 0 : -1);
    }
    sortByID() {
        return this.sort('id');
    }
    sortByDatePurchase() {
        return this.sort('dateOfPurchase');
    }
    sizeCollection() {
        return this.boardGames.length;
    }
    getBoardGame(index) {
        return this.boardGames[index];
    }
}
class BoardGameCollectionIterator {
    constructor(boardGameCollection) {
        this.boardGameCollection = boardGameCollection;
        this.position = 0;
        this.boardGameCollection = boardGameCollection;
    }
    next() {
        this.position += 1;
        if (this.position === this.boardGameCollection.sizeCollection()) {
            this.position = 0;
        }
        return this.boardGameCollection.getBoardGame(this.position);
    }
    prev() {
        this.position -= 1;
        if (this.position < 0) {
            this.position = this.boardGameCollection.sizeCollection() - 1;
        }
        return this.boardGameCollection.getBoardGame(this.position);
    }
    current() {
        return this.boardGameCollection.getBoardGame(this.position);
    }
    index() {
        return this.position;
    }
}
class BoardGameCollectionIteratorByID extends BoardGameCollectionIterator {
    constructor(boardGameCollection) {
        super(boardGameCollection);
        this.boardGameCollection.sortByID();
    }
}
class BoardGameCollectionIteratorByDatePurchase extends BoardGameCollectionIterator {
    constructor(boardGameCollection) {
        super(boardGameCollection);
        this.boardGameCollection.sortByDatePurchase();
    }
}
const iteratorByID = new BoardGameCollectionIteratorByID(new BoardGameCollection(boardGameCollection));
console.log(iteratorByID.current());
console.log(iteratorByID.next());
console.log(iteratorByID.next());
console.log(iteratorByID.next());
console.log(iteratorByID.prev());
console.log(iteratorByID.index());
const iteratorByDatePurchase = new BoardGameCollectionIteratorByDatePurchase(new BoardGameCollection(boardGameCollection));
console.log(iteratorByDatePurchase.current());
console.log(iteratorByDatePurchase.next());
console.log(iteratorByDatePurchase.next());
console.log(iteratorByDatePurchase.next());
console.log(iteratorByDatePurchase.prev());
console.log(iteratorByDatePurchase.index());
