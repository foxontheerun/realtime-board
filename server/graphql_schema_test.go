package server_test

import (
	"os"
	"testing"

	"github.com/vektah/gqlparser/v2"
	"github.com/vektah/gqlparser/v2/ast"
)

func TestTransientBatchTypesPresent(t *testing.T) {
	schema := loadSchema(t)

	for _, typeName := range []string{"TransientShapePatchInput", "TransientShapePatch", "TransientBatchEvent"} {
		if schema.Types[typeName] == nil {
			t.Fatalf("expected type %q to exist in GraphQL schema", typeName)
		}
	}
}

func TestTransientBatchOperationsAndDeprecations(t *testing.T) {
	schema := loadSchema(t)

	mutation := schema.Types["Mutation"]
	if mutation == nil {
		t.Fatal("Mutation type not found")
	}
	if mutation.Fields.ForName("moveShapesTransient") == nil {
		t.Fatal("expected moveShapesTransient mutation to exist")
	}

	legacyMutation := mutation.Fields.ForName("moveShapeTransient")
	if legacyMutation == nil {
		t.Fatal("expected legacy moveShapeTransient mutation to exist")
	}
	if legacyMutation.Directives.ForName("deprecated") == nil {
		t.Fatal("expected moveShapeTransient mutation to be deprecated")
	}

	subscription := schema.Types["Subscription"]
	if subscription == nil {
		t.Fatal("Subscription type not found")
	}
	if subscription.Fields.ForName("shapesMoved") == nil {
		t.Fatal("expected shapesMoved subscription to exist")
	}

	legacySubscription := subscription.Fields.ForName("shapeMoved")
	if legacySubscription == nil {
		t.Fatal("expected legacy shapeMoved subscription to exist")
	}
	if legacySubscription.Directives.ForName("deprecated") == nil {
		t.Fatal("expected shapeMoved subscription to be deprecated")
	}
}

func loadSchema(t *testing.T) *ast.Schema {
	t.Helper()

	return gqlparser.MustLoadSchema(
		&ast.Source{Name: "graphql/transient.graphqls", Input: mustReadFile(t, "graphql/transient.graphqls")},
		&ast.Source{Name: "graphql/shape.graphqls", Input: mustReadFile(t, "graphql/shape.graphqls")},
		&ast.Source{Name: "graphql/board.graphqls", Input: mustReadFile(t, "graphql/board.graphqls")},
		&ast.Source{Name: "graphql/root.graphqls", Input: mustReadFile(t, "graphql/root.graphqls")},
	)
}

func mustReadFile(t *testing.T, path string) string {
	t.Helper()
	b, err := os.ReadFile(path)
	if err != nil {
		t.Fatalf("read schema file %s: %v", path, err)
	}
	return string(b)
}
