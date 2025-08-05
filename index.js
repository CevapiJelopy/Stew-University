const spaceID = w8k7eopjaozq;
const token = rhKn6_Z1hASUyLxmU4p4DFEp90SNwlVD-wbLFg941ss;
const environment = 'master';

fetch(`https://cdn.contentful.com/spaces/${spaceID}/environments/${environment}/entries?access_token=${token}`)
    .then(res => res.json())
    .then(data => {
        console.log(data);
        console.log('First title:', data.items[0]);
        })
    .catch(err => console.error(err));