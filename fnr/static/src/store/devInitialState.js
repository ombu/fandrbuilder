

const initialState = {
  projects: [
    {
      name: 'OMBU Media', 
      id: 1,
      audiences: [
        { id: 1, name: 'Administrator' },
        { id: 2, name: 'Editor' },
        { id: 3, name: 'Visitor' },
        { id: 4, name: 'Developer' }
      ],
      scopes: [
        {
          id: 1,
          project: 1,
          name: 'Icebox',
          order: 0
        },
        {
          id: 2,
          project: 1,
          name: 'Accepted',
          order: 1
        }
      ],
      features: [
        {
          id: 1,
          project: 1,
          name: 'Creating Media',
          description: 'Facilitates adding media files to the site.',
          effort: 8
        },
        {
          id: 2,
          project: 1,
          name: 'Using Media',
          description: 'Using media files as content on the site.',
          effort: 10
        },
        {
          id: 3,
          project: 1,
          name: 'Selecting Media',
          description: 'A workflow for selecting media files.',
          effort: 16
        },
        {
          id: 4,
          project: 1,
          name: 'Media Field',
          description: 'An entity field that uses OMBU Media file selection.',
          effort: 14
        }
      ],
      requirements: [
        {
          id: 1,
          scope: 1,
          feature: 1,
          order: 1,
          audience: 1,
          requirement: 'I can create a media asset by uploading a file of a valid format: .zip, .doc(x), .xls(x), ppt(x),  .pdf, .jpg, .png',
          effort: 4,
          type: 'User Story'
        },
        {
          id: 2,
          scope: 1,
          feature: 1,
          order: 2,
          audience: 1,
          requirement: 'I can create a video media asset by providing a Vimeo URL',
          effort: 5,
          type: 'User Story'
        },
        {
          id: 3,
          scope: 1,
          feature: 1,
          order: 3,
          audience: 2,
          requirement: 'After uploading a new media assets, I can categorize it, tag it, and provide other metadata',
          effort: 5,
          type: 'User Story'
        },
        {
          id: 4,
          scope: 1,
          feature: 2,
          order: 4,
          audience: 1,
          requirement: 'When I use a image media asset, it will automatically be scaled and cropped appropriately by the CMS for the various contexts in which it might appear',
          effort: 5,
          type: 'User Story'
        },
        {
          id: 5,
          scope: 1,
          feature: 2,
          order: 5,
          audience: 2,
          requirement: 'When creating content on the site, I can choose assets from the Media Library to place in my content',
          effort: 9,
          type: 'User Story'
        },
        {
          id: 6,
          scope: 1,
          feature: 2,
          order: 6,
          audience: 3,
          requirement: 'While viewing media that was embedded in an RTE, I see the fully rendered asset in the style selected by the editor',
          effort: 7,
          type: 'User Story'
        },
        {
          id: 7,
          scope: 1,
          feature: 2,
          order: 7,
          audience: 4,
          requirement: 'When embedding media into an RTE, the result is a single HTML tag with necessary medatada in data attributes ',
          effort: 13,
          type: 'Validation'
        },
        {
          id: 8,
          scope: 1,
          feature: 3,
          order: 8,
          audience: 1,
          requirement: 'I can filter media items by name',
          effort: 2,
          type: 'User Story'
        },
        {
          id: 9,
          scope: 1,
          feature: 3,
          order: 9,
          audience: 1,
          requirement: 'I can view a paginated grid of all media items sorted by upload date',
          effort: 8,
          type: 'User Story'
        },
        {
          id: 10,
          scope: 1,
          feature: 4,
          order: 9,
          audience: 1,
          requirement: 'When building a website, I can add a Media field to content that would allow administrators to select media from the Media Library, prefiltered by any of the filters available in the Media Library',
          effort: 22,
          type: 'User Story'
        },
        {
          id: 11,
          scope: 2,
          feature: 4,
          order: 10,
          audience: 4,
          requirement: 'When adding a file field I can define which file types the widget will allow for upload, browsing and selection.',
          effort: 22,
          type: 'User Story'
        }
      ]
    },
    {
      name: 'Project 2',
      id: 2,
      scopes: [
        {
          id: 3,
          project: 1,
          name: 'Icebox',
          order: 0
        },
        {
          id: 4,
          project: 1,
          name: 'Release 1',
          order: 1
        },
        {
          id: 5,
          project: 1,
          name: 'Release 2',
          order: 2
        }
      ],
      audiences: [],
      features: [],
      requirements: []
    },
    {
      name: 'Project 3',
      id: 3,
      scopes: [],
      audiences: [],
      features: [],
      requirements: []
    }
  ],
  ui: {
    add: undefined
  }
};

export default initialState;
