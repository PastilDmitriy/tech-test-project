import { render, screen, fireEvent } from "@testing-library/react";
import { Modal } from "./Modal";

describe("Modal", () => {
  it("renders trigger and calls onOpen when clicked", () => {
    const onOpen = jest.fn();
    const onClose = jest.fn();

    render(
      <Modal
        id="test-modal"
        title="Test Title"
        isOpen={false}
        onOpen={onOpen}
        onClose={onClose}
        renderTrigger={(open) => (
          <button type="button" onClick={open}>
            Open
          </button>
        )}
      >
        <p>Modal content</p>
      </Modal>
    );

    expect(screen.getByRole("button", { name: "Open" })).toBeInTheDocument();
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "Open" }));
    expect(onOpen).toHaveBeenCalled();
  });

  it("renders modal content when isOpen is true", () => {
    render(
      <Modal
        id="test-modal"
        title="Test Title"
        isOpen
        onOpen={jest.fn()}
        onClose={jest.fn()}
        renderTrigger={() => null}
      >
        <p>Modal content</p>
      </Modal>
    );

    expect(screen.getByRole("dialog")).toBeInTheDocument();
    expect(screen.getByText("Test Title")).toBeInTheDocument();
    expect(screen.getByText("Modal content")).toBeInTheDocument();
  });

  it("does not render dialog when isOpen is false", () => {
    render(
      <Modal
        id="test-modal"
        title="Test Title"
        isOpen={false}
        onOpen={jest.fn()}
        onClose={jest.fn()}
        renderTrigger={() => null}
      >
        <p>Modal content</p>
      </Modal>
    );

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("has accessible title", () => {
    render(
      <Modal
        id="test-modal"
        title="Accessible Title"
        isOpen
        onOpen={jest.fn()}
        onClose={jest.fn()}
        renderTrigger={() => null}
      >
        <p>Content</p>
      </Modal>
    );

    const dialog = screen.getByRole("dialog", { name: "Accessible Title" });
    expect(dialog).toBeInTheDocument();
  });
});
