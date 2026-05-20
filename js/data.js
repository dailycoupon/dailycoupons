const STORES = [
  { id: 'amazon', name: 'Amazon', logo: 'https://www.google.com/s2/favicons?domain=amazon.com&sz=128', category: 'Shopping', url: 'https://amazon.com', cashback: '3%', featured: true },
  { id: 'target', name: 'Target', logo: 'https://www.google.com/s2/favicons?domain=target.com&sz=128', category: 'Shopping', url: 'https://target.com', cashback: '2%', featured: true },
  { id: 'walmart', name: 'Walmart', logo: 'https://www.google.com/s2/favicons?domain=walmart.com&sz=128', category: 'Shopping', url: 'https://walmart.com', cashback: '2%', featured: true },
  { id: 'nike', name: 'Nike', logo: 'https://www.google.com/s2/favicons?domain=nike.com&sz=128', category: 'Fashion', url: 'https://nike.com', cashback: '5%', featured: true },
  { id: 'adidas', name: 'Adidas', logo: 'https://www.google.com/s2/favicons?domain=adidas.com&sz=128', category: 'Fashion', url: 'https://adidas.com', cashback: '4%', featured: true },
  { id: 'macys', name: "Macy's", logo: 'https://www.google.com/s2/favicons?domain=macys.com&sz=128', category: 'Fashion', url: 'https://macys.com', cashback: '5%', featured: true },
  { id: 'bestbuy', name: 'Best Buy', logo: 'https://www.google.com/s2/favicons?domain=bestbuy.com&sz=128', category: 'Electronics', url: 'https://bestbuy.com', cashback: '1%', featured: true },
  { id: 'homedepot', name: 'Home Depot', logo: 'https://www.google.com/s2/favicons?domain=homedepot.com&sz=128', category: 'Home & Garden', url: 'https://homedepot.com', cashback: '2%', featured: false },
  { id: 'gap', name: 'Gap', logo: 'https://www.google.com/s2/favicons?domain=gap.com&sz=128', category: 'Fashion', url: 'https://gap.com', cashback: '3%', featured: false },
  { id: 'oldnavy', name: 'Old Navy', logo: 'https://www.google.com/s2/favicons?domain=oldnavy.com&sz=128', category: 'Fashion', url: 'https://oldnavy.com', cashback: '3%', featured: true },
  { id: 'expedia', name: 'Expedia', logo: 'https://www.google.com/s2/favicons?domain=expedia.com&sz=128', category: 'Travel', url: 'https://expedia.com', cashback: '2%', featured: true },
  { id: 'booking', name: 'Booking.com', logo: 'https://www.google.com/s2/favicons?domain=booking.com&sz=128', category: 'Travel', url: 'https://booking.com', cashback: '3%', featured: false },
  { id: 'hotels', name: 'Hotels.com', logo: 'https://www.google.com/s2/favicons?domain=hotels.com&sz=128', category: 'Travel', url: 'https://hotels.com', cashback: '4%', featured: false },
  { id: 'uber', name: 'Uber', logo: 'https://www.google.com/s2/favicons?domain=uber.com&sz=128', category: 'Travel', url: 'https://uber.com', cashback: '1%', featured: false },
  { id: 'doordash', name: 'DoorDash', logo: 'https://www.google.com/s2/favicons?domain=doordash.com&sz=128', category: 'Food & Dining', url: 'https://doordash.com', cashback: '2%', featured: false },
  { id: 'ubereats', name: 'Uber Eats', logo: 'https://www.google.com/s2/favicons?domain=ubereats.com&sz=128', category: 'Food & Dining', url: 'https://ubereats.com', cashback: '2%', featured: false },
  { id: 'grubhub', name: 'Grubhub', logo: 'https://www.google.com/s2/favicons?domain=grubhub.com&sz=128', category: 'Food & Dining', url: 'https://grubhub.com', cashback: '3%', featured: false },
  { id: 'sephora', name: 'Sephora', logo: 'https://www.google.com/s2/favicons?domain=sephora.com&sz=128', category: 'Beauty', url: 'https://sephora.com', cashback: '4%', featured: true },
  { id: 'ulta', name: 'Ulta Beauty', logo: 'https://www.google.com/s2/favicons?domain=ulta.com&sz=128', category: 'Beauty', url: 'https://ulta.com', cashback: '3%', featured: false },
  { id: 'chewy', name: 'Chewy', logo: 'https://www.google.com/s2/favicons?domain=chewy.com&sz=128', category: 'Pets', url: 'https://chewy.com', cashback: '5%', featured: false },
  { id: 'petco', name: 'Petco', logo: 'https://www.google.com/s2/favicons?domain=petco.com&sz=128', category: 'Pets', url: 'https://petco.com', cashback: '3%', featured: false },
  { id: 'wayfair', name: 'Wayfair', logo: 'https://www.google.com/s2/favicons?domain=wayfair.com&sz=128', category: 'Home & Garden', url: 'https://wayfair.com', cashback: '5%', featured: true },
  { id: 'ikea', name: 'IKEA', logo: 'https://www.google.com/s2/favicons?domain=ikea.com&sz=128', category: 'Home & Garden', url: 'https://ikea.com', cashback: '2%', featured: false },
  { id: 'overstock', name: 'Overstock', logo: 'https://www.google.com/s2/favicons?domain=overstock.com&sz=128', category: 'Home & Garden', url: 'https://overstock.com', cashback: '6%', featured: false },
  { id: 'apple', name: 'Apple', logo: 'https://www.google.com/s2/favicons?domain=apple.com&sz=128', category: 'Electronics', url: 'https://apple.com', cashback: '1%', featured: false },
  { id: 'samsung', name: 'Samsung', logo: 'https://www.google.com/s2/favicons?domain=samsung.com&sz=128', category: 'Electronics', url: 'https://samsung.com', cashback: '3%', featured: false },
  { id: 'newegg', name: 'Newegg', logo: 'https://www.google.com/s2/favicons?domain=newegg.com&sz=128', category: 'Electronics', url: 'https://newegg.com', cashback: '2%', featured: false },
  { id: 'dell', name: 'Dell', logo: 'https://www.google.com/s2/favicons?domain=dell.com&sz=128', category: 'Electronics', url: 'https://dell.com', cashback: '2%', featured: false },
  { id: 'udemy', name: 'Udemy', logo: 'https://www.google.com/s2/favicons?domain=udemy.com&sz=128', category: 'Education', url: 'https://udemy.com', cashback: '0%', featured: true },
  { id: 'coursera', name: 'Coursera', logo: 'https://www.google.com/s2/favicons?domain=coursera.com&sz=128', category: 'Education', url: 'https://coursera.com', cashback: '0%', featured: false },
  { id: 'hm', name: 'H&M', logo: 'https://www.google.com/s2/favicons?domain=hm.com&sz=128', category: 'Fashion', url: 'https://hm.com', cashback: '2%', featured: false },
  { id: 'zara', name: 'Zara', logo: 'https://www.google.com/s2/favicons?domain=zara.com&sz=128', category: 'Fashion', url: 'https://zara.com', cashback: '0%', featured: false },
  { id: 'uniqlo', name: 'Uniqlo', logo: 'https://www.google.com/s2/favicons?domain=uniqlo.com&sz=128', category: 'Fashion', url: 'https://uniqlo.com', cashback: '0%', featured: false },
  { id: 'nordstrom', name: 'Nordstrom', logo: 'https://www.google.com/s2/favicons?domain=nordstrom.com&sz=128', category: 'Fashion', url: 'https://nordstrom.com', cashback: '3%', featured: false },
  { id: 'bloomingdales', name: "Bloomingdale's", logo: 'https://www.google.com/s2/favicons?domain=bloomingdales.com&sz=128', category: 'Fashion', url: 'https://bloomingdales.com', cashback: '4%', featured: false },
  { id: 'kohls', name: "Kohl's", logo: 'https://www.google.com/s2/favicons?domain=kohls.com&sz=128', category: 'Fashion', url: 'https://kohls.com', cashback: '3%', featured: false },
  { id: 'jcpenney', name: 'JCPenney', logo: 'https://www.google.com/s2/favicons?domain=jcpenney.com&sz=128', category: 'Fashion', url: 'https://jcpenney.com', cashback: '4%', featured: false },
  { id: 'tj-maxx', name: 'TJ Maxx', logo: 'https://www.google.com/s2/favicons?domain=tjmaxx.com&sz=128', category: 'Fashion', url: 'https://tjmaxx.com', cashback: '2%', featured: false },
  { id: 'netflix', name: 'Netflix', logo: 'https://www.google.com/s2/favicons?domain=netflix.com&sz=128', category: 'Entertainment', url: 'https://netflix.com', cashback: '0%', featured: false },
  { id: 'spotify', name: 'Spotify', logo: 'https://www.google.com/s2/favicons?domain=spotify.com&sz=128', category: 'Entertainment', url: 'https://spotify.com', cashback: '0%', featured: false },
  { id: 'audible', name: 'Audible', logo: 'https://www.google.com/s2/favicons?domain=audible.com&sz=128', category: 'Entertainment', url: 'https://audible.com', cashback: '3%', featured: false },
  { id: 'asos', name: 'ASOS', logo: 'https://www.google.com/s2/favicons?domain=asos.com&sz=128', category: 'Fashion', url: 'https://asos.com', cashback: '3%', featured: false },
  { id: 'shein', name: 'Shein', logo: 'https://www.google.com/s2/favicons?domain=shein.com&sz=128', category: 'Fashion', url: 'https://shein.com', cashback: '4%', featured: false },
  { id: 'lululemon', name: 'lululemon', logo: 'https://www.google.com/s2/favicons?domain=lululemon.com&sz=128', category: 'Fashion', url: 'https://lululemon.com', cashback: '2%', featured: false },
  { id: 'underarmour', name: 'Under Armour', logo: 'https://www.google.com/s2/favicons?domain=underarmour.com&sz=128', category: 'Fashion', url: 'https://underarmour.com', cashback: '5%', featured: false },
  { id: 'puma', name: 'Puma', logo: 'https://www.google.com/s2/favicons?domain=puma.com&sz=128', category: 'Fashion', url: 'https://puma.com', cashback: '4%', featured: false },
  { id: 'reebok', name: 'Reebok', logo: 'https://www.google.com/s2/favicons?domain=reebok.com&sz=128', category: 'Fashion', url: 'https://reebok.com', cashback: '5%', featured: false },
  { id: 'newbalance', name: 'New Balance', logo: 'https://www.google.com/s2/favicons?domain=newbalance.com&sz=128', category: 'Fashion', url: 'https://newbalance.com', cashback: '3%', featured: false },
  { id: 'vans', name: 'Vans', logo: 'https://www.google.com/s2/favicons?domain=vans.com&sz=128', category: 'Fashion', url: 'https://vans.com', cashback: '3%', featured: false },
  { id: 'converse', name: 'Converse', logo: 'https://www.google.com/s2/favicons?domain=converse.com&sz=128', category: 'Fashion', url: 'https://converse.com', cashback: '2%', featured: false },
  { id: 'footlocker', name: 'Foot Locker', logo: 'https://www.google.com/s2/favicons?domain=footlocker.com&sz=128', category: 'Fashion', url: 'https://footlocker.com', cashback: '2%', featured: false },
  { id: 'dickssporting', name: "Dick's Sporting Goods", logo: 'https://www.google.com/s2/favicons?domain=dickssportinggoods.com&sz=128', category: 'Sports', url: 'https://dickssportinggoods.com', cashback: '3%', featured: false },
  { id: 'rei', name: 'REI', logo: 'https://www.google.com/s2/favicons?domain=rei.com&sz=128', category: 'Sports', url: 'https://rei.com', cashback: '2%', featured: false },
  { id: 'etsy', name: 'Etsy', logo: 'https://www.google.com/s2/favicons?domain=etsy.com&sz=128', category: 'Shopping', url: 'https://etsy.com', cashback: '3%', featured: false },
  { id: 'ebay', name: 'eBay', logo: 'https://www.google.com/s2/favicons?domain=ebay.com&sz=128', category: 'Shopping', url: 'https://ebay.com', cashback: '1%', featured: false },
  { id: 'costco', name: 'Costco', logo: 'https://www.google.com/s2/favicons?domain=costco.com&sz=128', category: 'Shopping', url: 'https://costco.com', cashback: '2%', featured: false },
  { id: 'samsclub', name: "Sam's Club", logo: 'https://www.google.com/s2/favicons?domain=samsclub.com&sz=128', category: 'Shopping', url: 'https://samsclub.com', cashback: '2%', featured: false },
  { id: 'lowes', name: "Lowe's", logo: 'https://www.google.com/s2/favicons?domain=lowes.com&sz=128', category: 'Home & Garden', url: 'https://lowes.com', cashback: '2%', featured: false },
  { id: 'crateandbarrel', name: 'Crate & Barrel', logo: 'https://www.google.com/s2/favicons?domain=crateandbarrel.com&sz=128', category: 'Home & Garden', url: 'https://crateandbarrel.com', cashback: '4%', featured: false },
  { id: 'potterybarn', name: 'Pottery Barn', logo: 'https://www.google.com/s2/favicons?domain=potterybarn.com&sz=128', category: 'Home & Garden', url: 'https://potterybarn.com', cashback: '4%', featured: false },
  { id: 'williams-sonoma', name: 'Williams-Sonoma', logo: 'https://www.google.com/s2/favicons?domain=williams-sonoma.com&sz=128', category: 'Home & Garden', url: 'https://williams-sonoma.com', cashback: '4%', featured: false },
];

const COUPONS = [
  // Amazon
  { id: 1, storeId: 'amazon', code: 'SAVE10', description: 'Save 10% on your next order', discount: '10% Off', category: 'Shopping', expiry: '2026-06-30', verified: true, exclusive: true, trending: true },
  { id: 2, storeId: 'amazon', code: 'PRIME20', description: 'Extra 20% off for Prime members', discount: '20% Off', category: 'Shopping', expiry: '2026-05-31', verified: true, exclusive: false, trending: false },
  { id: 3, storeId: 'amazon', code: '', description: 'Free shipping on orders over $35', discount: 'Free Shipping', category: 'Shopping', expiry: '2026-12-31', verified: true, exclusive: false, trending: false },

  // Target
  { id: 4, storeId: 'target', code: 'TARGET15', description: 'Get 15% off your entire order', discount: '15% Off', category: 'Shopping', expiry: '2026-06-15', verified: true, exclusive: true, trending: true },
  { id: 5, storeId: 'target', code: 'CIRCLE5', description: '$5 off $50+ with Target Circle', discount: '$5 Off', category: 'Shopping', expiry: '2026-05-31', verified: true, exclusive: false, trending: false },
  { id: 6, storeId: 'target', code: '', description: 'Buy 3, Get 1 Free on select items', discount: 'BOGO', category: 'Shopping', expiry: '2026-06-30', verified: true, exclusive: false, trending: false },

  // Walmart
  { id: 7, storeId: 'walmart', code: 'WALMART10', description: '10% off grocery pickup orders', discount: '10% Off', category: 'Shopping', expiry: '2026-06-30', verified: true, exclusive: false, trending: false },
  { id: 8, storeId: 'walmart', code: '', description: 'Free same-day delivery on $35+ orders', discount: 'Free Delivery', category: 'Shopping', expiry: '2026-12-31', verified: true, exclusive: false, trending: true },

  // Nike
  { id: 9, storeId: 'nike', code: 'NIKE20', description: 'Save 20% sitewide on Nike.com', discount: '20% Off', category: 'Fashion', expiry: '2026-06-01', verified: true, exclusive: true, trending: true },
  { id: 10, storeId: 'nike', code: 'MEMBER25', description: 'Nike Members: 25% off select styles', discount: '25% Off', category: 'Fashion', expiry: '2026-05-28', verified: true, exclusive: false, trending: false },
  { id: 11, storeId: 'nike', code: '', description: 'Free shipping on all orders', discount: 'Free Shipping', category: 'Fashion', expiry: '2026-12-31', verified: true, exclusive: false, trending: false },

  // Adidas
  { id: 12, storeId: 'adidas', code: 'ADICLUB30', description: 'adiClub members: 30% off full price items', discount: '30% Off', category: 'Fashion', expiry: '2026-06-30', verified: true, exclusive: true, trending: true },
  { id: 13, storeId: 'adidas', code: 'SALE40', description: 'Up to 40% off sale items', discount: 'Up to 40% Off', category: 'Fashion', expiry: '2026-05-31', verified: true, exclusive: false, trending: false },

  // Macy's
  { id: 14, storeId: 'macys', code: 'SUMMER25', description: 'Get 25% off summer fashion', discount: '25% Off', category: 'Fashion', expiry: '2026-06-15', verified: true, exclusive: true, trending: true },
  { id: 15, storeId: 'macys', code: 'FRIEND20', description: 'Friends & Family: 20% off your purchase', discount: '20% Off', category: 'Fashion', expiry: '2026-05-31', verified: true, exclusive: false, trending: false },
  { id: 16, storeId: 'macys', code: 'CLEARANCE', description: 'Extra 50% off clearance items', discount: '50% Off', category: 'Fashion', expiry: '2026-06-30', verified: true, exclusive: false, trending: false },

  // Best Buy
  { id: 17, storeId: 'bestbuy', code: 'TECH10', description: '10% off select electronics', discount: '10% Off', category: 'Electronics', expiry: '2026-06-30', verified: true, exclusive: false, trending: false },
  { id: 18, storeId: 'bestbuy', code: 'STUDENT15', description: 'Student discount: 15% off', discount: '15% Off', category: 'Electronics', expiry: '2026-12-31', verified: true, exclusive: false, trending: false },
  { id: 19, storeId: 'bestbuy', code: '', description: 'Free delivery on orders $35+', discount: 'Free Shipping', category: 'Electronics', expiry: '2026-12-31', verified: true, exclusive: false, trending: false },

  // Old Navy
  { id: 20, storeId: 'oldnavy', code: 'OLDNAVY50', description: 'Up to 50% off your order', discount: '50% Off', category: 'Fashion', expiry: '2026-06-01', verified: true, exclusive: true, trending: true },
  { id: 21, storeId: 'oldnavy', code: 'SUMMER30', description: 'Extra 30% off sale items', discount: '30% Off', category: 'Fashion', expiry: '2026-05-31', verified: true, exclusive: false, trending: false },

  // Expedia
  { id: 22, storeId: 'expedia', code: 'TRAVEL15', description: '15% off select hotels', discount: '15% Off', category: 'Travel', expiry: '2026-07-31', verified: true, exclusive: true, trending: true },
  { id: 23, storeId: 'expedia', code: 'FLIGHT10', description: '$10 off flight bookings', discount: '$10 Off', category: 'Travel', expiry: '2026-06-30', verified: true, exclusive: false, trending: false },

  // Sephora
  { id: 24, storeId: 'sephora', code: 'BEAUTY20', description: '20% off sitewide beauty products', discount: '20% Off', category: 'Beauty', expiry: '2026-06-30', verified: true, exclusive: true, trending: true },
  { id: 25, storeId: 'sephora', code: 'ROUGE10', description: 'Rouge members: extra 10% off', discount: '10% Off', category: 'Beauty', expiry: '2026-05-31', verified: true, exclusive: false, trending: false },
  { id: 26, storeId: 'sephora', code: '', description: 'Free shipping on orders over $50', discount: 'Free Shipping', category: 'Beauty', expiry: '2026-12-31', verified: true, exclusive: false, trending: false },

  // Wayfair
  { id: 27, storeId: 'wayfair', code: 'HOME20', description: 'Save 20% on home furniture', discount: '20% Off', category: 'Home & Garden', expiry: '2026-06-30', verified: true, exclusive: true, trending: false },
  { id: 28, storeId: 'wayfair', code: 'DECOR15', description: '15% off home decor items', discount: '15% Off', category: 'Home & Garden', expiry: '2026-05-31', verified: true, exclusive: false, trending: false },

  // Udemy
  { id: 29, storeId: 'udemy', code: 'LEARN80', description: 'Up to 80% off top courses', discount: '80% Off', category: 'Education', expiry: '2026-06-01', verified: true, exclusive: true, trending: true },
  { id: 30, storeId: 'udemy', code: 'START15', description: 'Courses from $14.99 for new students', discount: 'From $14.99', category: 'Education', expiry: '2026-05-31', verified: true, exclusive: false, trending: false },

  // DoorDash
  { id: 31, storeId: 'doordash', code: 'DASH50', description: '50% off your first 3 orders', discount: '50% Off', category: 'Food & Dining', expiry: '2026-06-30', verified: true, exclusive: true, trending: true },
  { id: 32, storeId: 'doordash', code: 'DASHPASS', description: 'First month of DashPass free', discount: 'Free Trial', category: 'Food & Dining', expiry: '2026-12-31', verified: true, exclusive: false, trending: false },

  // Chewy
  { id: 33, storeId: 'chewy', code: 'PET30', description: '30% off your first auto-ship order', discount: '30% Off', category: 'Pets', expiry: '2026-06-30', verified: true, exclusive: true, trending: false },
  { id: 34, storeId: 'chewy', code: 'NEWPET20', description: '20% off for new customers', discount: '20% Off', category: 'Pets', expiry: '2026-05-31', verified: true, exclusive: false, trending: false },

  // Gap
  { id: 35, storeId: 'gap', code: 'GAP40', description: '40% off your purchase', discount: '40% Off', category: 'Fashion', expiry: '2026-06-01', verified: true, exclusive: false, trending: false },
  { id: 36, storeId: 'gap', code: 'DENIM15', description: 'Extra 15% off denim styles', discount: '15% Off', category: 'Fashion', expiry: '2026-05-31', verified: true, exclusive: false, trending: false },

  // Nordstrom
  { id: 37, storeId: 'nordstrom', code: 'NORDY25', description: '25% off sale items', discount: '25% Off', category: 'Fashion', expiry: '2026-06-30', verified: true, exclusive: false, trending: false },

  // Kohl's
  { id: 38, storeId: 'kohls', code: 'KOHLS30', description: '30% off your next purchase', discount: '30% Off', category: 'Fashion', expiry: '2026-06-01', verified: true, exclusive: false, trending: false },
  { id: 39, storeId: 'kohls', code: 'KOHL10', description: 'Extra $10 off $50+', discount: '$10 Off', category: 'Fashion', expiry: '2026-05-31', verified: true, exclusive: false, trending: false },

  // Ulta
  { id: 40, storeId: 'ulta', code: 'ULTA20', description: '20% off a single item', discount: '20% Off', category: 'Beauty', expiry: '2026-06-15', verified: true, exclusive: false, trending: false },

  // ASOS
  { id: 41, storeId: 'asos', code: 'ASOS15', description: '15% off your first order', discount: '15% Off', category: 'Fashion', expiry: '2026-06-30', verified: true, exclusive: true, trending: false },

  // Home Depot
  { id: 42, storeId: 'homedepot', code: 'HD10HOME', description: '10% off appliances $396+', discount: '10% Off', category: 'Home & Garden', expiry: '2026-06-30', verified: true, exclusive: false, trending: false },

  // Lululemon
  { id: 43, storeId: 'lululemon', code: 'LULU25', description: '25% off markdown styles', discount: '25% Off', category: 'Fashion', expiry: '2026-05-31', verified: true, exclusive: false, trending: false },
];

const CATEGORIES = [
  'All',
  'Shopping',
  'Fashion',
  'Electronics',
  'Travel',
  'Food & Dining',
  'Beauty',
  'Home & Garden',
  'Sports',
  'Pets',
  'Entertainment',
  'Education',
];

const TRENDING_SEARCHES = [
  'Amazon', 'Nike', 'Target', 'Adidas', 'Sephora',
  'DoorDash', 'Best Buy', 'Old Navy', 'Wayfair', 'Udemy',
];

const FAQ = [
  {
    question: 'How do I use a coupon code from DailyCoupons?',
    answer: "Find a coupon for your favorite store, click 'Show Code' to reveal the promo code, then copy it and paste it at checkout on the store's website.",
  },
  {
    question: 'Are the coupons on DailyCoupons verified?',
    answer: 'Yes! Our team verifies coupon codes regularly. Coupons marked with a checkmark have been tested and confirmed to work.',
  },
  {
    question: 'What is 2xCashback?',
    answer: 'Our 2xCashback program lets you earn double cashback on select purchases. Sign up for a free account to start earning cashback on your online shopping.',
  },
  {
    question: 'How often are new coupons added?',
    answer: 'We add and update coupons daily. Check back often or sign up for our newsletter to get the latest deals delivered to your inbox.',
  },
  {
    question: 'What should I do if a coupon code is not working?',
    answer: 'Make sure the code is entered exactly as shown and that your cart meets any minimum requirements. If it still fails, try another coupon from our list.',
  },
];

function getStoreById(id) {
  return STORES.find(s => s.id === id);
}

function getCouponsByStore(storeId) {
  return COUPONS.filter(c => c.storeId === storeId);
}

function getFeaturedStores() {
  return STORES.filter(s => s.featured);
}

function getTrendingCoupons() {
  return COUPONS.filter(c => c.trending);
}

function searchStores(query) {
  const q = query.toLowerCase();
  return STORES.filter(s => s.name.toLowerCase().includes(q) || s.category.toLowerCase().includes(q));
}

function searchCoupons(query) {
  const q = query.toLowerCase();
  return COUPONS.filter(c => {
    const store = getStoreById(c.storeId);
    return (
      c.description.toLowerCase().includes(q) ||
      c.discount.toLowerCase().includes(q) ||
      c.category.toLowerCase().includes(q) ||
      (store && store.name.toLowerCase().includes(q))
    );
  });
}
