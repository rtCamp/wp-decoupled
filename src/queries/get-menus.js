import { gql } from '@apollo/client';
import MenuFragment from './fragments/menus';

export default gql`
    query GET_MENUS {
        headerMenus: menuItems(where: { location: PRIMARY, parentId: "0" }) {
            edges {
                node {
                    ...MenuFragment
                    childItems {
                        edges {
                            node {
                                ...MenuFragment
                            }
                        }
                    }
                }
            }
        }
        footerMenus: menuItems(where: { location: FOOTER, parentId: "0" }) {
            edges {
                node {
                    ...MenuFragment
                    childItems {
                        edges {
                            node {
                                ...MenuFragment
                            }
                        }
                    }
                }
            }
        }
    }
    ${MenuFragment}
`;
