import '@testing-library/jest-dom';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { GalleryCarousel } from '../components/GalleryCarousel';

const mockItems = [
  {
    title: 'Test Image 1',
    description: 'Test Description 1',
    imageId: 'test1',
    filename: 'test1.jpg'
  },
  {
    title: 'Test Image 2',
    description: 'Test Description 2',
    imageId: 'test2',
    filename: 'test2.jpg'
  }
];

describe('GalleryCarousel', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('renders all slides', () => {
    render(<GalleryCarousel items={mockItems} />);
    
    mockItems.forEach(item => {
      expect(screen.getByText(item.title)).toBeInTheDocument();
      expect(screen.getByText(item.description)).toBeInTheDocument();
    });
  });

  it('navigates to next slide when clicking next button', () => {
    render(<GalleryCarousel items={mockItems} />);
    
    const nextButton = screen.getByLabelText('Next slide');
    fireEvent.click(nextButton);
    
    expect(screen.getByText('Test Image 2')).toBeInTheDocument();
  });

  it('navigates to previous slide when clicking previous button', () => {
    render(<GalleryCarousel items={mockItems} />);
    
    // First go to second slide
    const nextButton = screen.getByLabelText('Next slide');
    fireEvent.click(nextButton);
    
    // Then go back
    const prevButton = screen.getByLabelText('Previous slide');
    fireEvent.click(prevButton);
    
    expect(screen.getByText('Test Image 1')).toBeInTheDocument();
  });

  it('navigates to specific slide when clicking dot', () => {
    render(<GalleryCarousel items={mockItems} />);
    
    const secondDot = screen.getByLabelText('Go to slide 2');
    fireEvent.click(secondDot);
    
    expect(screen.getByText('Test Image 2')).toBeInTheDocument();
  });

  it('pauses auto-advance on hover', () => {
    render(<GalleryCarousel items={mockItems} />);
    
    const carousel = screen.getByRole('group');
    fireEvent.mouseEnter(carousel);
    
    act(() => {
      jest.advanceTimersByTime(5000);
    });
    
    expect(screen.getByText('Test Image 1')).toBeInTheDocument();
  });

  it('resumes auto-advance on mouse leave', () => {
    render(<GalleryCarousel items={mockItems} />);
    
    const carousel = screen.getByRole('group');
    fireEvent.mouseEnter(carousel);
    fireEvent.mouseLeave(carousel);
    
    act(() => {
      jest.advanceTimersByTime(5000);
    });
    
    expect(screen.getByText('Test Image 2')).toBeInTheDocument();
  });
}); 