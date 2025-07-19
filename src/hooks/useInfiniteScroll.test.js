import React from 'react'
import { render, act } from '@testing-library/react'
import useInfiniteScroll from './useInfiniteScroll'

function ScrollTester(props) {
  useInfiniteScroll(props)
  return null
}

describe('useInfiniteScroll', () => {
  let onLoadMore

  beforeAll(() => {
    Object.defineProperty(window, 'innerHeight', {
      writable: true,
      configurable: true,
      value: 100
    })
    Object.defineProperty(document.documentElement, 'scrollHeight', {
      writable: true,
      configurable: true,
      value: 100
    })
  })

  beforeEach(() => {
    onLoadMore = jest.fn()
  })

  function mockScrollTop(value) {
    Object.defineProperty(document.documentElement, 'scrollTop', {
      configurable: true,
      get: () => value,
    })
  }

  it('calls onLoadMore when scrolled to bottom and hasMore=true & not loading', () => {
    mockScrollTop(0)

    render(
      <ScrollTester
        isLoading={false}
        hasMore={true}
        onLoadMore={onLoadMore}
        threshold={0}
      />
    )

    act(() => {
      window.dispatchEvent(new Event('scroll'))
    })

    expect(onLoadMore).toHaveBeenCalledTimes(1)
  })

  it('does not call onLoadMore when isLoading=true', () => {
    mockScrollTop(0)

    render(
      <ScrollTester
        isLoading={true}
        hasMore={true}
        onLoadMore={onLoadMore}
        threshold={0}
      />
    )

    act(() => {
      window.dispatchEvent(new Event('scroll'))
    })

    expect(onLoadMore).not.toHaveBeenCalled()
  })

  it('does not call onLoadMore when hasMore=false', () => {
    mockScrollTop(0)

    render(
      <ScrollTester
        isLoading={false}
        hasMore={false}
        onLoadMore={onLoadMore}
        threshold={0}
      />
    )

    act(() => {
      window.dispatchEvent(new Event('scroll'))
    })

    expect(onLoadMore).not.toHaveBeenCalled()
  })

  it('allows loading again after load is completed', () => {
    mockScrollTop(0)

    const { rerender } = render(
      <ScrollTester
        isLoading={true}
        hasMore={true}
        onLoadMore={onLoadMore}
        threshold={0}
      />
    )

    act(() => window.dispatchEvent(new Event('scroll')))
    expect(onLoadMore).not.toHaveBeenCalled()

    rerender(
      <ScrollTester
        isLoading={false}
        hasMore={true}
        onLoadMore={onLoadMore}
        threshold={0}
      />
    )

    act(() => window.dispatchEvent(new Event('scroll')))
    expect(onLoadMore).toHaveBeenCalledTimes(1)
  })
})
