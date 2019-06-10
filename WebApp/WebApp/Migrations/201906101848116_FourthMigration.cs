namespace WebApp.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class FourthMigration : DbMigration
    {
        public override void Up()
        {
            AlterColumn("dbo.Pricelists", "Start", c => c.DateTime());
            AlterColumn("dbo.Pricelists", "End", c => c.DateTime());
            AlterColumn("dbo.Tickets", "IssueDate", c => c.DateTime());
        }
        
        public override void Down()
        {
            AlterColumn("dbo.Tickets", "IssueDate", c => c.DateTime(nullable: false));
            AlterColumn("dbo.Pricelists", "End", c => c.DateTime(nullable: false));
            AlterColumn("dbo.Pricelists", "Start", c => c.DateTime(nullable: false));
        }
    }
}
