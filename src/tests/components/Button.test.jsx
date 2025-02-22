import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event'
import Button from '../../components/common/Button'
import { vi } from 'vitest';
describe("Button Component", () => {

    it("Render Button with-out children", () => {
        render(<Button></Button>)

        expect(screen.getByRole('button')).toBeInTheDocument()
    })
    it("Render Button with children", () => {
        render(<Button>"Hello World"</Button>)
        screen.debug();
        expect(screen.getByText(/Hello World/)).toBeInTheDocument();
    })

    it("Button with Click Event", async () => {
        const user = userEvent.setup();

        console.log = vi.fn();
        render(<Button onClick={() => console.log("hello world")}>"Hello World"</Button>);

        const button = screen.getByRole('button', { name: /hello world/i });
        await user.click(button);

        expect(console.log).toHaveBeenCalledWith("hello world");

    })


    it("should set the correct button type", () => {
        render(<Button type="submit">Submit</Button>);

        // Get the button by its text content
        const button = screen.getByRole("button", { name: /submit/i });

        // Assert that the button has the type 'submit'
        expect(button).toHaveAttribute("type", "submit");
    });

    it("should default to 'button' type when no type is provided", () => {
        render(<Button>Click me</Button>);

        // Get the button by its text content
        const button = screen.getByRole("button", { name: /click me/i });

        // Assert that the button has the default type 'button'
        expect(button).toHaveAttribute("type", "button");
    });

})