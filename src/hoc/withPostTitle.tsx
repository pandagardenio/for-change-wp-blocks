import { withSelect } from '@wordpress/data';
import React from 'react';

export type WithPostTitleProps = {
    postTitle: string;
}

export function withPostTitle<T extends WithPostTitleProps = WithPostTitleProps>(
    WrappedComponent: React.ComponentType<T>
): React.ComponentType<T> {
    return withSelect<WithPostTitleProps, T>(select => ({
        postTitle: typeof select("core/editor").getPostEdits().title !== 'undefined' ?
            select("core/editor").getPostEdits().title :
            select("core/editor").getCurrentPost().title
    }))(WrappedComponent);
}
