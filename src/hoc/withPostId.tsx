import { withSelect } from '@wordpress/data';
import React from 'react';

export type WithPostIdProps = {
    postId: number;
}

export function withPostId<T extends WithPostIdProps = WithPostIdProps>(
    WrappedComponent: React.ComponentType<T>
): React.ComponentType<T> {
    return withSelect<WithPostIdProps, T>(select => ({
        postId: select("core/editor").getCurrentPostId()
    }))(WrappedComponent);
}
